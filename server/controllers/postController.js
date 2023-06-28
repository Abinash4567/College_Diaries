require("../models/database");
const Category = require("../models/Category");
const post = require("../models/post");

/*  GET Homepage  */
exports.homepage = async(req, res) => {
    try {
      const limitNumber = 5;
      const categories = await Category.find({}).limit(limitNumber);


      const latest = await post.find({}).sort({_id: -1}).limit(limitNumber);


      const robo = await post.find({ 'category': 'Robotics Club' }).limit(limitNumber);
      const aero = await post.find({ 'category': 'Aero Club' }).limit(limitNumber);
      const coding = await post.find({ 'category': 'Coding Club' }).limit(limitNumber);
  
      const posts = { latest, robo, aero, coding };


      res.render('index', { 
                            title: 'Campus Diaries - Home', categories, posts
                        } );                                                       //rendering index page
    } 
    catch (error){
      res.status(500).send({ message: error.message || "Error Occured" });
    }
  }
  


  /**
   * GET /categories
   * Categories 
  */
  exports.exploreCategories = async(req, res) => {
    try {
      const limitNumber = 16;
      const categories = await Category.find({}).limit(limitNumber);
      res.render('categories', { title: 'Campus Diaries - Categories', categories } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 



    /**
 * GET /categories/:id
 * Categories By Id
*/
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await post.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Campus Diaries - Categories', categoryById } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 





    exports.explorePost = async(req, res)=>{
      try{
        let post_id = req.params.id;
        const post_cont = await post.findById(post_id);

        // res.send(post_cont.description);
        // res.end();

        res.render('post', { title: 'Campus Diaries', post_cont });
      }
      catch(error)
      {
        res.status(500).send({ message: error.messsage || "Error Occured"});
      }
    }





//              Search post             POST request
exports.searchpost = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let search_res = await post.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render("search", {title: "Campus Diaries - Search", search_res});
  } 
  catch (error)
   {
    res.satus(500).send({message: error.message || "Error Occured" });
   }
}



exports.exploreLatest = async(req, res)=>{
  try{
    const limitNumber = 16;
    const post_cont = await post.find({}).sort( {_id:-1} ).limit(limitNumber)
    res.render('explore-latest', { title: 'Campus Diaries - Latest Post', post_cont });
  }
  catch(error)
  {
    res.status(500).send({ message: error.messsage || "Error Occured"});
  }
}


exports.exploreRandom = async(req, res)=>{
  try{
    let total_count = await post.find().countDocuments();
    let random = Math.floor(Math.random() * total_count);
    let post_content = await post.findOne().skip(random).exec();

    res.render('explore-random', { title: 'Campus Diaries - Random Post', post_content });
  }
  catch(error)
  {
    res.status(500).send({ message: error.messsage || "Error Occured"});
  }
}



exports.submitPost = async(req, res)=>{
  res.render("submit-post", {title: "Campus Diaries - Submit Post"});
}


































  


//Adding initial categories


// async function insertCategoryData(){
//     try
//     {
//         await Category.insertMany([
//                     {
//                     "name": "Robotics Club",
//                     "image": "robo.jpg"
//                     },
//                     {
//                     "name": "Aero Club",
//                     "image": "aero.jpg"
//                     }, 
//                     {
//                     "name": "Coding Club",
//                     "image": "coding.jpg"
//                     },
//                     {
//                     "name": "Dramatics",
//                     "image": "drama.jpg"
//                     }, 
//                     {
//                     "name": "Literacy",
//                     "image": "lit.jpg"
//                     },
//                     {
//                     "name": "Athletics",
//                     "image": "athletics.jpg"
//                     },
//                     {
//                     "name": "Football Club",
//                     "image": "football.jpg"
//                     },
//                     {
//                     "name": "Cricket Club",
//                     "image": "cricket.jpg"
//                     },
//                     {
//                     "name": "Chess Club",
//                     "image": "chess.jpg"
//                     },
//                     {
//                     "name": "Kabbadi",
//                     "image": "kabbadi.jpg"
//                     },
//                     {
//                     "name": "Media House",
//                     "image": "media.jpg"
//                     },
//                     {
//                     "name": "Rotract",
//                     "image": "rotract.jpg"
//                     },
//                     {
//                     "name": "Green Club",
//                     "image": "green.jpg"
//                     },
//                     {
//                     "name": "Steering",
//                     "image": "steering.jpg"
//                     },
//                     {
//                     "name": "Astrowing",
//                     "image": "astro.jpg"
//                     },
//                     {
//                     "name": "Senior Mentor",
//                     "image": "smp.jpg"
//                     }

//                 ]);
//     }
//     catch(error)
//     {
//         console.log("error:"+ error)
//     }
// }

// insertCategoryData();





// async function insertpostData(){
//   try {
//     await post.insertMany([
//         { 
//           "name": "Automatic Door Lock System",
//           "description": `Hey everyone, We have some exciting news to share with you all! Our robotics club is proud to announce the successful completion of our latest project - Robotic Room Automation
//  Our team has worked tirelessly to develop a locking mechanism that can be activated through RFID technology. We want to take this opportunity to thank our team members who have put in endless hours of hard work to make this project a success and implemented it in our own club as a locking mechanism.
 
//  Team Members
//  Deepak Kumar Singh (20215141)
//  Vinay Kumar (20215029)
//  Shobhit Singh (20213041)
//  Harshvardhan Raghuvanshi (20213009)
 
//  Project Video Report
//  https://youtu.be/UdR0xUox7no
 
//  About the Project
//  An RFID-based electronic door lock system is a keyless door lock system implemented using Arduino and RC522 RFID Module. In this system, you need a particular card or key tag to open and close the door, and put it in front of the RFID reader to unlock or close the door. If you put the wrong card in front of the reader then no action takes place and LCD will display the wrong card message.
 
//  Project Report Link
//  https://roboticsclub.mnnit.ac.in/projects/overview/60/
 
//  Mentored By:
//  Purushotam Kumar Agrawal (Final Year)
//  Bipul Karna (Third Year)
 
//  Our RFID-based electronic door lock system is not only convenient and efficient, but it also provides peace of mind knowing that our club is secure.
 
//  Best Regards
//  Robotics Club MNNIT`,
//           "email": "roboclub@mnnit.ac.in",
//           "category": "Robotics Club", 
//           "image": "robo.jpg"
//         },

//         { 
//           "name": "Rubik Cube Solver",
//           "description": `Hello robo enthusiasts!
//                               The Robotics Club MNNIT is thrilled to announce the completion of our Rubik's Cube-solving project! After months of hard work, dedication, and teamwork, our members have successfully built a robot that can solve the Rubik's Cube in record time. We couldn't be more proud of our team for pushing the boundaries of what's possible in the field of robotics.
 
//  Team Members
//  Vinay Singh (20214071)
//  Pavan Kumar (20215043)
 
//  You can check out our project video using the link provided:
//  https://www.youtube.com/watch?v=FHDl_1TUIMY 
 
//  About the project:
//  This project is a Rubik's Cube solver that utilizes color detection technology to determine the orientation of each face. using the Kociemba algorithm, the program generates a sequence of steps to solve the cube or create a special pattern. The GUI displays the progress of the solution, updating each step until the code is completely solved.
 
//  Project report link:
//  https://roboticsclub.mnnit.ac.in/projects/overview/59/
 
//  Mentored by:
//  Anurag Gupta (Final Year)
//  Shreya Gupta (Pre-Final Year)
 
//  Stay tuned for more updates from our robotics club, as we continue to push the boundaries of technology and innovation!
 
//  Best regards
//  Robotics club MNNIT`,
//           "email": "roboclub@mnnit.ac.in",
//           "category": "Robotics Club", 
//           "image": "robo.jpg"
//         },
 
//          { 
//           "name": "Music Genre Classification",
//           "description": `Hello everyone!
//                                      We are excited to announce the completion of our latest project that is Music Genre classification. The team, comprised of some of the most enthusiastic individuals from second year, demonstrated excellent coordination throughout the project. Their dedication to both the project and the club is truly admirable.
 
//  Here are the team members:
 
//  -Alok Kumar Singh(20214240)
//  -Shreyansh Sinha(20218002)
//  -Siddhant Bhardwaj (20213067)
 
//  You can check out our project video using the link provided below.
//  https://youtu.be/1MGkDt1iHKA
 
//  About Project:
//      The objective was to automate the music classification, to make the selection of songs quick and less cumbersome. 
//      This project uses a deep learning approach that can correctly predict the genre of Western music from popular candidate genres (classical, jazz, rap, rock, etc.).
//    You can go through this project report for a detailed explanation of the project.
 
//  Project report ->https://roboticsclub.mnnit.ac.in/projects/overview/53/
 
//  Mentored By:
//  Anurag Gupta
//  Purushotam Kumar Agrawal
//  Prakhar Agarwal
 
//  Stay tuned for more exciting projects!!
//  Thanks & Regards 
//  Robotics Club MNNIT `,
//           "email": "roboclub@mnnit.ac.in",
//           "category": "Robotics Club", 
//           "image": "aero.jpg"
//         },
     
//          { 
//           "name": "Requirement for Web-Team",
//           "description": `Robotics Club
//                           Vacancy Announcement
 
//  Position: Junior Web Developer
 
//  Application Deadline: 16-09-2023
 
//  Job Description: Maintain Web portal of Robotics Club
 
//  How to Apply: Present Physically in robotics club.
 
//  Note:
 
//  Only shortlisted candidates will be contacted.
//  All applications will be treated with strict confidentiality.
//  Join our team and be part of a dynamic and innovative company that values its employees' contributions. We offer a competitive salary, comprehensive benefits package, and opportunities for growth and development.
 
//  We appreciate your interest in joining our organization and look forward to receiving your application.`,
//           "email": "roboclub@mnnit.ac.in",
//           "category": "Robotics Club", 
//           "Requirement": ["Front-end", "Backend", "Good-Communication-Skill"],
//           "image": "aero.jpg"
//         }
//       ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertpostData();