import React from "react";
import './About.css';

function About() {
  return (
    <div className="About">
    	<h1> Our Goal </h1>
	<b> 
	  Utilizing Agile Scrum Methodology, our team wanted to create an accessible, 
	  specifically dedicated site where you could check the stats of your favorite 
	  sports teams! 
	</b> 
	<h1> Our Process </h1>
	<b>
	  By pulling data from the Sportsipy API into JSON files, we are able to show 
	  up-to-date stats on virtually any sport (only NFL is currently supported by 
	  our website). We use a combination of Django and React to display the data 
	  we pull from the API neatly on our website..
	</b>
	<div class="vertical-container">  
	  <h2> Want to visit our repository? </h2>
          <h2> Click here: <a href="https://github.com/Agile-Software-Engineering-Team-1/sportacus"> GitHub</a></h2>
	</div>
    </div>
  );
}

export default About;
