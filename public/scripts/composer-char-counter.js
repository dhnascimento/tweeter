$(document).ready(function() {
  console.log("Working");
});

// i = 0;
// $(document).ready(function() {
//   $('textarea').keydown(function() {
//     $('output').text(i +=1);
//   });
// });


// $(document).ready(function() {
//   $('textarea').focus(function () {
//    console.log(this); 
//   })
// });

$(document).ready(function() {
  $('textarea').on('input', function () {
    let maxChar = 140;
    let numChar = $('textarea[name="text"]').val().length;
    let wordCount = maxChar - numChar;
    const colorId = $('#char-count');
    colorId.text(wordCount)
    if (wordCount >= 0) {
     colorId.removeClass('negative');
    } else {
      colorId.addClass('negative');
    }
  })
});
