import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs
} from "firebase/firestore";

import fs from "fs";
import path from "path";

const firebaseConfig = {

    apiKey: "AIzaSyAOdRVwmg-Mtfvc2UennLCI-4V1VO5Nnoc",
  authDomain: "storequiz.firebaseapp.com",
  projectId: "storequiz",
  storageBucket: "storequiz.firebasestorage.app",
  messagingSenderId: "462730005071",
  appId: "1:462730005071:web:23d37871959ee5f4e8783a",
  measurementId: "G-SFRF5RK0KT"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function exportQuizzes(){

    const snapshot =
    await getDocs(
        collection(db,"quizzes")
    );

    const outputFolder =
    path.join(process.cwd(),"quiz");

    if(!fs.existsSync(outputFolder)){
        fs.mkdirSync(outputFolder);
    }

    let count = 0;

    snapshot.forEach(doc=>{

        const file =
        path.join(
            outputFolder,
            doc.id + ".json"
        );

        fs.writeFileSync(
            file,
            JSON.stringify(
                doc.data(),
                null,
                2
            )
        );

        console.log(
            "Saved:",
            doc.id + ".json"
        );

        count++;

    });

    console.log(
        "Export Completed."
    );

    console.log(
        "Total Quizzes:",
        count
    );

}

exportQuizzes()
.catch(console.error);