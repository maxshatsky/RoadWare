# RoadWare - Drive Safe

#### ITC Smart Cities Hackathon 2023

#### Group 4
**Full Stack**: Noa Sela , Reem Cohen , Shlomo Z

**Data Science**: Maxim Shatzki, Eliott Caen, Maya Halevy

### Problem
We developed RoadWare to address the issue of road safety and incorporate this into current navigation services. When using build in GPS or Google Maps, drivers are often only given the fastest route from point A to point B. But what if speed is not your only concern? 
With RoadWare you have options. 

### Functionality
Our app connects to the Google Maps API and provides 2 potential route options, highlighted in various danger levels (low, medium, and high). These danger levels are calculated by implementing machine learning models to calculate the density of car accidents at that point, normalized by the flow of traffic through this point.
Implementation wise, we see our model being a useful feature of Google Maps or Waze. 

To view a video of the app: https://www.loom.com/share/17baff0ab90d4c54b8bb913b9e066e5c

### Future Directions
This was a 2-day hackathon, and we are currently presenting the minimum viable prodict.
Our app currently works in New York, as this is where our data was collected. We see this app being useful in any city where the relevant data is available. Additionally, we hope to build a more sophisticated model(s) that  take in user vehicle type, time of day, day of the week, weather, etc. 
Also if the data is available, there is an option to present to users the most relevant dangers in their current area. For example, for some streets it may be relevant to pay attention to pedestrians, whereas others large trucks or motorcyclists may be the most likely causes of car accidents. 

