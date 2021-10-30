// Τα ερωτήματα 2 έως 7 θα απαντηθούν στο αρχείο αυτό

const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");

// 2. να ορίσετε τους σχετικούς χειριστές συμβάντων

newGuess.addEventListener('keydown', checkKey);
message.addEventListener('click', checkGuess); 
lowHigh.addEventListener('click', checkGuess); 
checkButton.addEventListener('click', checkGuess);
restartButton.addEventListener('click', restart);

let previousGuesses = [];
let win ;                  // Ορισμός μεταβλητής για win.
let lost ;                 // Ορισμός μεταβλητής για lost.
let theGuess;
window.onload = newRandom();
newGuess.focus();

function newRandom(){
/* 3. συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100 
 και τον εκχωρεί στη μεταβλητή theGuess */
theGuess = Math.floor(Math.random() * 100 + 1) ; // theGuess, η τυχαία τιμή που δίνει η εφαρμογή.
console.log("theGuess: " + theGuess);
}

function checkKey(e){
/* 4. συνάρτηση που όταν ο χρήστης πατήσει <<enter>> 
 να καλεί τη συνάρτηση που αποτελεί τον κεντρικό ελεγκτή του παιχνιδιού.
 */
    if (e.key === 'Enter') {
      checkGuess();
   }
}
  
function checkGuess(processGuess){
/* 5. Να ορίσετε συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει τις
κατάλληλες ενέργειες για να μην μπορεί να εισάγει ο χρήστης νέο αριθμό ή να ανασταλεί η λειτουργία
 του <<enter>>, εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
σε περίπτωση ολοκλήρωσης του παιχνιδιού. */

   let newValue = parseInt(newGuess.value); // newValue, η τιμή που δίνει ο παίκτης.
   console.log("newValue: " + newValue);
   newGuess.value = ""; // Αδιάζει το box της τιμής για να δεχθεί άλλη.
   processGuess(newValue);
   newGuess.focus(); // Επιστρέφει το focus στο box μετά από το κλικ με το ποντίκι.
   
   // Ανάλογα με τον αν είναι win ή lost εμφανίζει και επαναφέρει κουμπιά και μηνύματα 
   if (win) {
      document.getElementById("restart").style.display = "block";
      document.getElementById("check").style.visibility = "hidden";
      document.getElementById("new-guess").disabled = true;
      newGuess.removeEventListener('keydown', checkKey)
   }
   
   else if (lost) {
      document.getElementById("restart").style.display = "block";
      document.getElementById("check").style.visibility = "hidden";
      message.innerHTML = "Τέλος παιχνιδιού, έχασες!";
      message.style.backgroundColor =  "var(--msg-wrong-color)";
      document.getElementById("new-guess").disabled = true;
      newGuess.removeEventListener('keydown', checkKey)
   }
   
   function processGuess(newValue){
   /* 6.  Να ορίσετε συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
   περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
   τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
   δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
   Όλα τα μηνύματα του προγράμματος εμανίζονται από την processGuess().
   Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει
   κάποια ιδιαίτερη τιμή,  είτε να επιστρέφει κάποια τιμή της επιλογής σας */

   //Ελέγχει αν εισάχθηκε γράμμα ή κενό ξεκινώντας, αν είναι μεγαλύτερη ή μικρότερη η τιμή που έδωσε  
   // ο παίκτης, και τέλος αν βρήκε το σωστό αριθμό. 
   if (isNaN(newValue)) {
      message.innerHTML = "Δώσε αριθμό";
      message.style.backgroundColor =  "var(--msg-wrong-color)";
   }

   else if (newValue > theGuess) {
      message.innerHTML = "Λάθος, το ξεπέρασες";
      message.style.backgroundColor =  "var(--msg-wrong-color)";
      
   }
   else if (newValue < theGuess){
      message.innerHTML = "Λάθος, είσαι πιο χαμηλά";
      message.style.backgroundColor =  "var(--msg-wrong-color)";
   }
   else if (newValue == theGuess){
      message.innerHTML = "Μπράβο, το βρήκες!";
      message.style.backgroundColor =  "var(--msg-win-color)";
      
   }
   //Γεμίζει τον πίνακα τοων προηγούμενων προσπαθειών.
   if (!isNaN(newValue)) {
      previousGuesses.push(newValue)
      let keno = "";
      let result = previousGuesses.reduce((keno, el) => keno += " " + el);
      lowHigh.innerHTML = ("Προηγούμενες προσπάθειες : " + (result));
      console.log(previousGuesses);
      }
    // Ελέγχει αν τελείωσε το παιχνίδι με νίκη ή πέρασαν και οι 10 προσπάθεις άκαρπες. 
   win = newValue == theGuess;
   lost = previousGuesses.length == 10 && newValue !== theGuess;
   
}
}

function restart(){
  /* 7. Να ορίσετε συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο 
  'restart' και επανεκινεί τη διαδικασία */
//   Εμφανίζει και κρύβει πλήκτρα restart και checkKey. Ενεργοποιεί το new-guess, αρχικοποιεί μετρητές
//   και τρέχει συναρτήσεις για το ξεκίνημε του παιχνιδιού.
  
  document.getElementById("restart").style.display = "none";
  document.getElementById("check").style.visibility = "visible";
  document.getElementById("new-guess").disabled = false;
  newGuess.addEventListener('keydown', checkKey);
  message.innerHTML = "";
  message.style.backgroundColor = "";
  previousGuesses = new Array();
        for ( let i = 0; i < previousGuesses.length; ++i)
        previousGuesses[i] = ("");
        console.log(previousGuesses);
        lowHigh.innerHTML = (previousGuesses);
   newRandom();
   newGuess.focus();
}
