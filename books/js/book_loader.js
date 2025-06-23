window.pw = window.pw || {}; 
window.pw.Books = {};
    
(function(exporta){
    
    var BOOKS;

    function review(evt){     
        var i = evt.currentTarget.dataset.book;
        $("#review"+i).fadeIn("fast"); 
    }

    function unreview(evt){
       var i = evt.currentTarget.dataset.book;
       $("#review"+i).fadeOut("fast");
    }


    function openBook(evt){
      var i = parseInt(evt.currentTarget.dataset.book);
      window.location.href=BOOKS[i].url;
    }

    function isBookGenre(genreList, queryGenre) {

      var genreList = genreList.split(",");
      for (var i=0; i<genreList.length; i++)
      {
        if (queryGenre === genreList[i])
          return true;
      }
      return false;
    }


    //Sort books by title
    function sortBooks(key){
      BOOKS.sort(function(a, b){
          return a[key].localeCompare(b[key]);
      });
    }


    function createUI(){

      //Unbind all events    
      $(".book").off("click");
      $(".bookreviewed").off();
      $(".bookreviewed").off();

      var selectedGenre = document.getElementById("genre").value;
      var bookData = "";
      var count = 0;

      for (var i=0; i<BOOKS.length; i++)
      {
        var book = BOOKS[i];
        if (!(selectedGenre === "All" || isBookGenre(book["genre"], selectedGenre)))
            continue;

        count += 1;
        bookData += '<DIV class="col-xs-4 col-md-2 parent">\n';
        if (book["url"])
        {
          bookData += '\t<div id="book'+i+'" class="book" data-book="'+i+'">';

          bookData += '<IMG id="book'+i+'" src="' + book["img"] + '"/></div>\n';
          bookData += '\t<DIV class="bookreviewed" data-book="'+ i +'"> '+book["level"]+"  " +(book["key"]?'<img src="css/key.png" style="width:1.2vmin"/>':'');
        
            bookData += '<DIV id=review'+i+' class="bookreview" style="display:none;"><table>';
            bookData += '<tr><td><b>Titol:</b></td><td>'+book["title"]+'</td></tr>';
            bookData += '<tr><td><b>Autor:</b></td><td>'+book["author"]+'</td></tr>';
            bookData += '<tr><td><b>Any:</b></td><td>'+book["year"]+'</td></tr>';
            bookData += '<tr><td><b>Categoria:</b></td><td>'+book["genre"]+'</td></tr>';
            bookData += '<tr><td><b>Nivell:</b></td><td>'+book["level"]+'</td></tr>';
            bookData += '</table></DIV>';
            bookData += '</DIV>\n';
            
          bookData +=' </DIV>\n';
          
        } else {
          bookData += '\t<IMG src="' + book["img"] + '" class="img-responsive book" />\n';
        }

       

        if (count % 3 === 0)
        {
          if (count % 6 === 0)
          { /* Add the shelf. */
            bookData += '<DIV class="col-xs-12 shelf"></DIV>\n';
          } else {
            /* Add the shelf for smaller screens. */
            bookData += '<DIV class="col-xs-12 shelf hidden-md hidden-lg"></DIV>\n';
          }
        }
      }
     
      /* At this point, we are done displaying all the books we had to display.
         If required, fill empty books to complete the shelf */
      if (count % 6 !== 0)
      {
        while (count % 6 !== 0)
        {
          
          bookData += '<DIV class="col-xs-4 col-md-2 parent"></DIV>';
          count += 1;
          if (count % 6 === 0)
          { /* Add the shelf. */
            bookData += '<DIV class="col-xs-12 shelf"></DIV>\n';
          }
        }
      }

      $("#bookData").empty().append(bookData);
      $(".book").on("click", openBook);
      $(".bookreviewed").on("mouseover", review);
      $(".bookreviewed").on("mouseout", unreview);
      
      

      for (var i=0;i<BOOKS.length;i++)
      {
        //Try to guess the border color
        var b = BOOKS[i];
        b.level = b.level || "";
        b.genre = b.genre || "";
        if(b.genre.toLowerCase().startsWith("sol")){ 
            b.border = "#eee";
        } else {
            var level = b.level.toLowerCase();
            if(level.startsWith("3") && level.indexOf("eso")>=0){ 
                b.border = "#075c07";
            } else if(b.level.startsWith("4")  && level.indexOf("")>=0){ 
                b.border = "blue";
            } 
            else if(b.level.startsWith("1")  && level.indexOf("bat")>=0){ 
                b.border = "#d58a00";
            } else if(b.level.startsWith("1")  && level.indexOf("bat")>=0){ 
                b.border = "red";
            } else {
                b.border = "#ddd";
            }
        }
        
        $("#book"+i).CoverTresD({color: BOOKS[i].border});
        
      }

    }


    exporta.loadBooks = function() {

      $.post("/rest/auth/bookmgr", {method: "books/list"}).then(function(r){
            BOOKS = r;    
            sortBooks("title");
            createUI();
      });

    };

})(window.pw.Books);