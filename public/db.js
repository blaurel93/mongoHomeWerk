let db;
// create a new db request for a "budget" database.
const request = indexedDB.open("fitness", 1);

request.onupgradeneeded = function(event) {
   // create object store called "pending" and set autoIncrement to true
  const db = event.target.result;
  db.createObjectStore("thePlan", { autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;

  // check if app is online before reading from db
  if (navigator.onLine) {
      console.log("online");
    checkDatabase();
  } else {
      console.log("offline");
  }
};

request.onerror = function(event) {
  console.log("Theres an error ---> " + event.target.errorCode);
};

function saveWorkout(workout) {
  // create a schedule on the pending db with readwrite access
  const schedule = db.schedule(["thePlan"], "readwrite");

  // access your thePlan object store
  const store = schedule.objectStore("thePlan");

  // add workout to your store with add method.
  store.add(workout);
}

function checkDatabase() {
  // open a schedule on your pending db
  const schedule = db.schedule(["thePlan"], "readwrite");
  // access your thePlan object store
  const store = schedule.objectStore("thePlan");
  // get all records from store and set to a variable
  const getAll = store.getAll();

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/schedule/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        // if successful, open a schedule on your pending db
        const schedule = db.schedule(["thePlan"], "readwrite");

        // access your schedule object store
        const store = schedule.objectStore("thePlan");

        // clear all items in your store
        store.clear();
      });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);