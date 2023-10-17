# 🚗 RoadWare - Drive Safe

**ITC Smart Cities Hackathon 2023**

## Team Members

### Full Stack Developers:
- **Noa Sela**
- **Reem Cohen**
- **Shlomo Z**

### Data Science Team:
- **Maxim Shatzki**
- **Eliott Caen**
- **Maya Halevy**

---

## 🚦 Problem Statement
In today's navigation systems, drivers are typically provided with the quickest route from point A to point B. However, the fastest route might not always be the safest. With RoadWare, we offer a solution that prioritizes safety by providing the driver with options that highlight the level of danger in different route segments.

---

## 🛠 Functionality
RoadWare integrates seamlessly with the Google Maps API. When queried, our application offers users two distinct route suggestions, each highlighted with danger levels: `low`, `medium`, or `high`. These danger levels stem from our machine learning model that factors in the density of car accidents in a given area, normalized by the traffic flow.

🎥 **Demo Video**: [RoadWare in Action](https://www.loom.com/share/17baff0ab90d4c54b8bb913b9e066e5c)

> **Note**: As this project was developed during a 2-day hackathon, we present a minimum viable product (MVP) in the demo.

---

## 🌐 Future Directions

- **Expansion to Other Cities**: Our current model is tailored for New York due to the data we used. We believe RoadWare can be beneficial in any city, provided the requisite data is obtainable.
  
- **Integration with Popular Navigation Apps**: We envision RoadWare as a valuable addition to popular platforms like Google Maps or Waze.

- **Enhanced Features**: In future iterations, we plan to:
    - Consider parameters like vehicle type, time of day, and day of the week.
    - Notify users about predominant dangers in their vicinity, such as areas with frequent pedestrian movement, large truck traffic, or prevalent motorcyclists.
