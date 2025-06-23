 
 
window.iedibAPI = window.iedibAPI || {};
window.iedibAPI.DEBUG = false;
window.iedibAPI.resolt_states = window.iedibAPI.resolt_states || {};

(function (api) {
	var pageInfo;


	// -------------------------------- UTILITY METHODS
	// Cross browser ajax
	var ajax = function (url, data, successCB, errorCB) {
		try {
			var x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
			x.open(data ? 'POST' : 'GET', url, 1);
			//x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			x.setRequestHeader('Content-type', 'application/json');
			x.onreadystatechange = function () {
				if (x.readyState > 3) {
					successCB && successCB(x.responseText, x);
				} else {
					errorCB && errorCB(x.responseText, x);
				}
			};
			x.send(JSON.stringify(data));
		} catch (e) {
			console.log(e);
			errorCB && errorCB(e);
		}
	};

	// Insert after an element
	var insertAfter = function (newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	// Extend an object
	var extend = function (source, target) {
		var keys = Object.keys(source);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			target[key] = source[key];
		}
		return target;
	};

	// Extract query parameters from url
	var parseUrlParams = function (url) {
		var params = {};
		var parts = url.substring(1).split('&');

		for (var i = 0; i < parts.length; i++) {
			var nv = parts[i].split('=');
			if (!nv[0]) continue;
			params[nv[0]] = nv[1] || true;
		}
		return params;
	};

	// Insert script after or before 
	var insertScript = function (url, isBefore) {
		// Check if this script is already in page
		var scripts = document.getElementsByTagName('script');
		var found;
		for (var i = 0; i < scripts.length; i++) {
			var script = scripts[i]
			if (script.src === url) {
				found = true;
				break;
			}
		}
		if (found) {
			return;
		}
		var tag = document.createElement('script');
		tag.src = url;
		tag.type = "text/javascript";

		if (isBefore && scripts.length) {
			var script0 = scripts[0];
			script0.parentNode.insertBefore(tag, script0);
		} else {
			document.head.appendChild(tag);
		}
	};

	var findIframeFromSource = function (iframeWin) {
		var iframes = document.getElementsByTagName("iframe");
		for (var i = 0; i < iframes.length; i++) {
			var iframe = iframes[i];
			if (iframe.contentWindow === iframeWin) {
				return iframe;
			}
		}
		return null;
	}

	// Cross browser load function
	var ready = function (fun, elem) {
		elem = elem || window.document;
		if (elem.readyState === "complete" || elem.readyState === "interactive") {
			fun();
		} else {
			if (elem.addEventListener) {
				elem.addEventListener('DOMContentLoaded', fun, false);
			} else if (elem.attachEvent) {
				elem.attachEvent('onload', fun);
			} else {
				fun();
			}
		}
	};

	var on = function (type, fn) {
		if (window.addEventListener) {
			window.addEventListener(type, fn);
		} else {
			window.attachEvent("on" + type, fn);
		}
	};

	// Converts seconds to human readable time lapse
	var convertTimeLapse = function (delta) {
		if (!delta) {
			return "mai";
		}

		// calculate (and subtract) whole days
		var days = Math.floor(delta / 86400);
		delta -= days * 86400;

		// calculate (and subtract) whole hours
		var hours = Math.floor(delta / 3600) % 24;
		delta -= hours * 3600;

		// calculate (and subtract) whole minutes
		var minutes = Math.floor(delta / 60) % 60;
		delta -= minutes * 60;

		// what's left is seconds
		var seconds = delta % 60;  // in theory the modulus is not required

		if (days) {
			return days + " d  " + hours + " h";
		} else if (hours) {
			return hours + " h  " + minutes + " min";
		} else if (minutes) {
			return minutes + " min  " + seconds + " s";
		} else {
			return seconds + " s";
		}
	};

	// Stoppable interval
	var PING_INTERVAL = 30;

	var RecurringTimer = function (callback, delay) {
		var timerId, start, remaining = delay;
		this.pause = function () {
			window.clearTimeout(timerId);
			remaining -= new Date() - start;
			timerId = null;
		};
		this.paused = function () {
			return timerId === null;
		};
		var resume = function () {
			start = new Date();
			timerId = window.setTimeout(function () {
				remaining = delay;
				resume();
				callback();
			}, remaining);
		};
		this.resume = resume;
	};
	// ------------------------------------ end utility methods

	window.iedibAPI.resoltHandler = function(randId) {
		if (iedibAPI.resolt_states[randId] == null) {
			iedibAPI.resolt_states[randId] = true;
		}
		var button = document.getElementById('resolt_button_' + randId);
		var ocultables = document.querySelectorAll('#resolt_' + randId + " .pw-resolt-ocultable"); 
	
		iedibAPI.resolt_states[randId] = !iedibAPI.resolt_states[randId];
		if (iedibAPI.resolt_states[randId]) {
			for (var i=0; i< ocultables.length; i++) {
				ocultables[i].style.display = "";
			}
			button.innerHTML = "Amaga resolució";
		} else {
			for (var i=0; i< ocultables.length; i++) {
				ocultables[i].style.display = "none";
			}
			button.innerHTML = "Mostra resolució";
		}
	};   
	
	var activateResoltBoxes = function() {
		var resoltBoxes = document.getElementsByClassName("pw-resolt-auto");
		for (var i=0; i<resoltBoxes.length; i++) {
			var id = Math.random().toString(32).substring(2);
			var box = resoltBoxes[i];
			box.id = "resolt_" + id;
			var btn = box.getElementsByClassName("pw-resolt-button")[0];
			if (btn) {
				btn.id = "resolt_button_" + id;
				btn.addEventListener("click", function(evt) {
					window.iedibAPI.resoltHandler(id);
				});		
				window.iedibAPI.resoltHandler(id);
			}
		}
	}

	// ------------------------------------ youtube utility methods
	//Global map to hold video tracking
	iedibAPI.videoTracking = {};

	var onPlayerReady = function (evt) {
		iedibAPI.DEBUG && console.log("onPlayerReady:: ", evt);

		var player = evt.target;
		var videoData = evt.videoData || player.getVideoData();
		var videoId = videoData['video_id'];
		var videoTitle = videoData['title'];
		var videoAuthor = videoData['author'];
		var duration = evt.duration || player.getDuration();
		var data = extend(pageInfo, { videoId: videoId, duration: duration, title: videoTitle, author: videoAuthor });

		var onVideoInfoAjaxSuccess = function (resRaw) {
			iedibAPI.DEBUG && console.log("onVideoInfoAjaxSuccess", resRaw);
			var res = JSON.parse(resRaw || {});
			iedibAPI.videoTracking[videoId] = { trackId: res.id, seconds: res.seconds, duration: duration };
			var color = "lightgray";
			var tick = "";

			var checkBox = document.createElement('div');
			checkBox.title = "0 %";

			if (res.lastModified && res.duration) {
				var tpc = Math.floor(res.seconds * 100. / res.duration);
				tpc = tpc > 100 ? 100 : tpc;
				checkBox.title = tpc + " %";
				if (tpc >= 80) {
					color = "blue";
					tick = "&#10004;";
				} else if (res.lastModified) {
					color = "#4bb8ef";
					tick = "&#10004;";
				}
			} else if (res.lastModified) {
				color = "#4bb8ef";
				tick = "&#10004;";
			}

			//Create a tick mark				
			checkBox.style = 'position: relative; padding: 2px; width: 11px; height: 11px; display:inline-block; border-radius: 2px; vertical-align: middle; margin: 0 5px; border: 3px dashed ' +
				color + '; color: ' + color + '; left: 0px; bottom: 0px;';
			checkBox.innerHTML = '<span style="position: absolute; bottom: 1px; left:0; right: 0">' + tick + '</span>';
			var videoTitleEl; 
			if (player.videoElement.className.indexOf("yt-video")>=0) {
				videoTitleEl = player.videoElement.parentNode.parentNode.getElementsByClassName("pw-caption")[0];
			} else {
				videoTitleEl = player.videoElement.parentNode.getElementsByClassName("pw-caption")[0];
			}
			if (videoTitleEl) {
				videoTitleEl.insertBefore(checkBox, videoTitleEl.firstChild);
			}
			iedibAPI.videoTracking[videoId].checkBox = checkBox;
		};

		if (data.userId) {
			ajax("https://piworld.es/iedibapi/video/info", data, onVideoInfoAjaxSuccess);
		}
	};

	var onPlayerStateChange = function (evt) {
		iedibAPI.DEBUG && console.log("onPlayerStateChange:: ", evt);
		var player = evt.target;
		var videoId;
		if (evt.videoData) {
			videoId = evt.videoData['video_id'];
		} else {
			videoId = player.getVideoData()['video_id'];
		}
		var vcc = iedibAPI.videoTracking[videoId];
		vcc.result = evt.result;

		var onVideoUpdateAjaxSuccess = function (resRaw) {
			iedibAPI.DEBUG && console.log("onVideoUpdateAjaxSuccess:: ", resRaw);
			var res = JSON.parse(resRaw);
			if (!res.changes) {
				return;
			}
			vcc.seconds += PING_INTERVAL;

			var color = "#4bb8ef";
			var tick = "&#10004";
			if (vcc.duration) {
				var tpc = Math.floor(vcc.seconds * 100. / vcc.duration);
				tpc = tpc > 100 ? 100 : tpc;
				vcc.checkBox.title = tpc + " %";
				if (tpc >= 80) {
					color = "blue";
				}
			}
			vcc.checkBox.style = 'position: relative; padding: 2px; width: 11px; height: 11px; display:inline-block; border-radius: 2px; vertical-align: middle; margin: 0 5px; border: 3px dashed ' +
				color + '; color: ' + color + '; left: 0px; bottom: 0px;';
			vcc.checkBox.innerHTML = '<span style="position: absolute; bottom: 1px; left:0; right: 0">' + tick + '</span>';
		};

		if (vcc && evt.data == YT.PlayerState.PLAYING) {
			if (!vcc.timer) {
				vcc.timer = new RecurringTimer(function () {
					if (!vcc.trackId) console.log("Something strange! No trackId set");
					var data = { id: vcc.trackId, seconds: PING_INTERVAL, result: vcc.result };
					ajax("https://piworld.es/iedibapi/video/update", data, onVideoUpdateAjaxSuccess);
				}, PING_INTERVAL * 1000);
			}
			vcc.timer.resume();
			var data = { id: vcc.trackId, seconds: 0 };
			ajax("https://piworld.es/iedibapi/video/update", data, onVideoUpdateAjaxSuccess);
		} else if (vcc && vcc.timer && evt.data !== YT.PlayerState.PLAYING) {
			vcc.timer.pause();
		};
	};

	

	var initYoutubeVideo = function (videoElement) {
		// If videoElement is already handled then return
		if (videoElement.className.indexOf("pw-yt-video-handled") >= 0) {
			api.DEBUG && console.log("initYoutubeVideo:: Already handled. Nothing to do ", videoElement);
			return;
		}
		api.DEBUG && console.log("initYoutubeVideo:: Initializing element ", videoElement);

		//Support ? in videoIds
		var videoId_elements = videoElement.id.replace("pwVideoId_", "").split("?");
		var videoId = videoId_elements[0];
		if (videoId_elements.length === 2) {
			//Do something
		}

		var player = new YT.Player(videoElement.id, {
			videoId: videoId,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
		player.videoElement = videoElement;
		videoElement.className = "pw-yt-video pw-yt-video-handled";		
	};

	



	// Search all youtube videos in page
	var prepareVideoCompletionPanel = function () {
		
		var videos = document.getElementsByClassName("pw-yt-video");
		//TODO: Filter those already parsed
		api.DEBUG && console.log("inspectYoutube: videos in page=>", videos);

		// Videos in this page
		if (videos.length) {
			// It contains youtube videos --> inject youtube iframe API
			if (window.YT) {
				api.DEBUG && console.log("inspectYoutube: YT already in page");
				
				// YT already in page
				for (var i = 0; i < videos.length; i++) {
					initYoutubeVideo(videos[i]);
				}
				
			} else {
				// Inject iframe script
				
				window.onYouTubeIframeAPIReady = function () {
					api.DEBUG && console.log("inspectYoutube: onYoutubeIframeAPIReady called");
					for (var i = 0; i < videos.length; i++) {
						initYoutubeVideo(videos[i]);
					}
				}	
				api.DEBUG && console.log("inspectYoutube: insert script https://www.youtube.com/iframe_api");
				insertScript("https://www.youtube.com/iframe_api", true);
			}
		}
		


		// Check if we are in first book page and show completion progress
		var completionDiv = document.getElementById("video-completion-progress");

		if (completionDiv) {
			ajax("https://piworld.es/iedibapi/video/progress", pageInfo, function (resRaw) {
				var res = JSON.parse(resRaw);

				if (Array.isArray(res) && res.length) {
					completionDiv.style = "padding:10px; margin:25px auto; width:75%; border: 1px solid #e3e3e3; border-radius: 4px; background-color: #f5f5f5;";

					var h4 = document.createElement("h4");
					h4.style = "text-transform: uppercase; color: gray; font-size: 1.1em;"
					h4.innerText = "Progrés dels videos";
					completionDiv.appendChild(h4);

					for (var i = 0; i < res.length; i++) {
						var row = res[i];
						var p = document.createElement("p");
						var divCheckMark = document.createElement("div");
						divCheckMark.style = 'position: relative; padding: 2px; width: 11px; height: 11px; display:inline-block; border-radius: 2px; vertical-align: middle; margin: 0 15px; border: 3px dashed ' +
							row.color + '; color:' + row.color + ';';
						divCheckMark.title = row.tpc + ' %';
						divCheckMark.innerHTML = '<span style="position: absolute; top: -2px">' + row.tick + '</span>';

						if (pageInfo.isTeacher) {
							var btn1 = document.createElement('button');
							btn1.onclick = iedibAPI.report;
							btn1.innerHTML = "+";
							btn1.title = "Generate report";
							btn1.style = "width:24px; height:24px; font-size: small; padding: 0px; vertical-align: baseline; background: lightblue; font-weight: bold;";
							btn1.setAttribute("data-videoid", row.videoId);
							p.appendChild(btn1);

							var btn2 = document.createElement('button');
							btn2.onclick = iedibAPI.cleanVideo;
							btn2.title = "Remove from book";
							btn2.innerHTML = "X";
							btn2.style = "width:24px; height:24px; font-size: small; padding: 0px; vertical-align: baseline; background: lightcoral; font-weight: bold;";
							btn2.setAttribute("data-videoid", row.videoId);
							p.appendChild(btn2);

							var btn3 = document.createElement('button');
							btn3.onclick = iedibAPI.replaceVideo;
							btn3.title = "Replace videoId";
							btn3.innerHTML = "R";
							btn3.style = "width:24px; height:24px; font-size: small; padding: 0px; vertical-align: baseline; background: orange; font-weight: bold;";
							btn3.setAttribute("data-videoid", row.videoId);
							p.appendChild(btn3);
						}
						p.appendChild(divCheckMark);
						var span1 = document.createElement('span');
						span1.innerHTML = row.title;
						p.appendChild(span1);
						completionDiv.appendChild(p);
					}


					// Check if the user is a teacher and display students progress
					if (pageInfo.isTeacher) {
						var reportDiv = document.createElement('div');
						reportDiv.id = "iedib-report-div";
						completionDiv.appendChild(reportDiv);
					}
				}
			});

		}
	};

	// ------------------------------------ end youtube utility methods

	// ------------------------------------ Page inspect methods
	var getPageInfo = function () {
		if (!document.querySelector) {
			return {};
		}

		// Get current user information
		var userId;
		var userFullname;

		var dataUserId = document.querySelector('[data-userid]');
		if (dataUserId) {
			userId = dataUserId.getAttribute('data-userid');
		}
		var userText = document.getElementsByClassName("usertext");
		if (userText && userText.length) {
			userFullname = userText[0].innerText;
		}

		// Get information about book id and chapter id
		var params = {};

		if (location.search) {
			params = parseUrlParams(location.search);
		}

		// Get information about the course
		var courseId;
		var courseName;

		var footer = document.querySelector(".homelink > a");

		if (footer) {
			courseName = footer.innerText;
			var hrefVal = "?" + (footer.href.split("?")[1] || "");
			courseId = parseUrlParams(hrefVal).id;
		}

		var isTeacher = document.querySelector('.usermenu li a[href*="switchrole"]') != null; 
		return {
			userId: userId, userFullname: userFullname, bookId: params.id, chapterId: params.chapterid,
			courseName: courseName, courseId: courseId, isTeacher: isTeacher, site: location.href.split("?")[0]
		};
	};
	// ------------------------------------ end page inspect methods

	var onPlayerXAPI = function(evt) {
		iedibAPI.DEBUG && console.log("XAPI ", evt);
		var videoId = evt.videoData['video_id'];
		var vcc = iedibAPI.videoTracking[videoId];
		ajax("https://piworld.es/iedibapi/video/xapi", {result: evt.result, id: vcc.trackId });
	};	

	// Wait for page content loaded to launch api
	var fireApi = function () {
		api.DEBUG && console.log("fireApi: document ready");

		activateResoltBoxes();

		pageInfo = getPageInfo();

		if (pageInfo.isTeacher) {

			window.iedibAPI.replaceVideo = function (evt) {
				var videoId = evt.target.getAttribute("data-videoid");
				var newVideoId = window.prompt("Introduïu una videoId que substituirà la vella " + videoId + " en aquest llibre.");
				if (!newVideoId || !newVideoId.trim()) {
					return;
				}
				newVideoId = newVideoId.trim();
				if (!window.confirm("Segur que voleu canviar les referències del video " + videoId + " a " + newVideoId + "?")) {
					return;
				}
				ajax("https://piworld.es/iedibapi/video/replace", { isTeacher: pageInfo.isTeacher, newVideoId: newVideoId, bookId: pageInfo.bookId, videoId: videoId, site: pageInfo.site }, function (resRaw) {
					var res = JSON.parse(resRaw);
					if (res.changes) {
						// Reload this page
						window.location.reload();
					}  
				});
			};

			window.iedibAPI.cleanVideo = function (evt) {
				var videoId = evt.target.getAttribute("data-videoid");

				if (!window.confirm("Segur que voleu eliminar les entrades de " + videoId + " d'aquest llibre?")) {
					return;
				}

				ajax("https://piworld.es/iedibapi/video/clean", { isTeacher: pageInfo.isTeacher, bookId: pageInfo.bookId, videoId: videoId }, function (resRaw) {
					var res = JSON.parse(resRaw);
					if (res.changes) {
						var p = evt.target.parentNode;
						p.parentNode.removeChild(p);
					}
				});
			};

			window.iedibAPI.report = function (evt) {
				var videoId = evt.target.getAttribute("data-videoid");

				var container = document.getElementById("iedib-report-div");
				if (container) {
					// Choose first video and show report
					ajax("https://piworld.es/iedibapi/video/report", { isTeacher: pageInfo.isTeacher, bookId: pageInfo.bookId, videoId: videoId, site: pageInfo.site }, function (resRaw2) {
						var res2 = JSON.parse(resRaw2);
						container.innerHTML = "";
						var h4 = document.createElement("h4");
						h4.style = "text-transform: uppercase; color: gray; font-size: 1.1em; margin-top: 10px;"
						h4.innerText = "Seguiment dels estudiants";
						container.appendChild(h4);

						var scrollPanel = document.createElement('div');
						scrollPanel.style = "width:100%;height:300px;overflow-y:scroll;";
						container.appendChild(scrollPanel);
						var ol = document.createElement("ol");
						scrollPanel.appendChild(ol);
						for (var i = 0; i < res2.length; i++) {
							var row = res2[i];
							var li1 = document.createElement("li");
							var tpc = 0;
							if (row.duration) {
								tpc = Math.floor(row.seconds * 100. / row.duration);
								tpc = tpc > 100 ? 100 : tpc;
							}
							var lapsed = convertTimeLapse(row.lastLapsed);
							li1.innerHTML =
								' <span style="width:300px; display:inline-block">' + row.fullname + "</span> " +
								'<span style="width:100px; display:inline-block">(' + tpc + " %)</span> " +
								' <span style="width:200px; display:inline-block">Accés ' + lapsed + "</span>";
							ol.appendChild(li1);
						}
					});
				}
			};

		}

		api.pageInfo = extend(pageInfo, {});
		if (pageInfo.userId && pageInfo.bookId) {
			api.DEBUG && console.log("fireApi: pageInfo=>", pageInfo);
			prepareVideoCompletionPanel();
		} else {
			console.log("iedibAPI:: Cannot inspect because cannot get pageInfo");
		}


		//Listen from iframes which are ready	
		on("message", function (evt) {
			/*
			// Events from youtube iframe api
			if (evt.data && evt.origin.indexOf("www.youtube.com") >= 0) {
				var data = JSON.parse(evt.data);
				if (data.event === "initialDelivery") {
					var videoData = data.info.videoData;
					var duration = data.info.duration;
					window.YT = window.YT || {
						PlayerState: {
							UNSTARTED: -1,
							ENDED: 0,
							PLAYING: 1,
							PAUSED: 2,
							BUFFERING: 3,
							CUED: 5
						}
					};
					var event = { target: { videoElement: findIframeFromSource(evt.source) }, videoData: videoData, duration: duration };
					onPlayerReady(event);

				} else if (data.event === "onStateChange") {
					var videoData = data.info.videoData;
					var duration = data.info.duration;
					var event = { target: { videoElement: findIframeFromSource(evt.source) }, videoData: videoData, duration: duration };
					onPlayerReady(event);
				}
			}
			*/

			// Events from h5p
			if (evt.data.context === "h5p" && evt.data.action === "h5p-is-ready") {
				// h5p iframe is ready, post pageInfo to this iframe
				//event.source.postMessage({type: "iedib-pageinfo", pageInfo: window.iedibAPI.pageInfo}, "*");
				// create a fake event from data recieved from
				var event = { target: { videoElement: findIframeFromSource(evt.source) }, videoData: evt.data.videoData, duration: evt.data.duration };
				if (!window.YT) {
					window.YT = { PlayerState: evt.data.PlayerState };
				}
				onPlayerReady(event);
			} else if (evt.data.context === "h5p" && evt.data.action === "h5p-has-changed") {
				// create a fake event from data recieved from
				var event = { target: { videoElement: findIframeFromSource(evt.source) }, videoData: evt.data.videoData, result: evt.data.result, data: evt.data.state };
				onPlayerStateChange(event);
			} else if (evt.data.context === "h5p" && evt.data.action === "h5p-xAPI" && evt.data.result) {
				// create a fake event from data recieved from
				var event = { target: { videoElement: findIframeFromSource(evt.source) }, videoData: evt.data.videoData, result: evt.data.result };
				onPlayerXAPI(event);
			}
			//TODO: we should do the same with piworld activities.
		});

	};

	ready(fireApi);



})(iedibAPI);
