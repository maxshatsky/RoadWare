import React from "react";
import { Button } from "react-bootstrap";
import "./NavigationPage.css";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  InfoWindow,
  Marker,
  Polyline,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import axios from "axios";

const libraries = ["places"];

const colors = {
  0: "#209d01",
  1: "#ffa600",
  2: "#d5011a",
};

function NavigationPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const center = useMemo(
    () => ({ lat: 40.714717096059125, lng: -74.00857509104527 }),
    []
  );
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);
  const originSearchBoxRef = useRef(null);
  const destinationSearchBoxRef = useRef(null);
  // const [path, setPath] = useState([]);
  const [selectedPolyline, setSelectedPolyline] = useState(null);
  const [segmentsPaths, setsegmentsPaths] = useState([]);

  const handleDirectionsResponse = useCallback((response) => {
    if (response !== null) {
      setDirections(response);
    }
  }, []);

  const handleOriginSearchBoxLoad = useCallback((searchBox) => {
    originSearchBoxRef.current = searchBox;
  }, []);

  const handleDestinationSearchBoxLoad = useCallback((searchBox) => {
    destinationSearchBoxRef.current = searchBox;
  }, []);

  const handleSearch = useCallback(() => {
    if (origin && destination) {
      // Call the direction service to get directions
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: "DRIVING",
          provideRouteAlternatives: true,
        },
        async (response, status) => {
          console.log(response)
          if (status === "OK") {
            const results = [];
            for (let i = 0; i < response.routes.length; i++) {
              console.log(response);
              const resultPath = response.routes[i].overview_path.map(
                (cord) => {
                  return { lng: cord.lng(), lat: cord.lat() };
                }
              );
              results.push(resultPath);
            }

            const data = await getDangerLevels(results)

            handleDirectionsResponse(response);
            setsegmentsPaths([...data[0], ...data[1]]);
          } else {
            console.log("Directions request failed:", status);
          }
        }
      );
    }
  }, [origin, destination, handleDirectionsResponse]);

  const getDangerLevels = async (results) => {
    try {
      const requests = results.map((result) =>
        axios.post("http://localhost:8080/danger/level", result)
      );

      const responses = await Promise.all(requests);
      const data = responses.map((response) => response.data);
      console.log(data);
      return data
    } catch (err) {
      console.log(err);
    }
  };

  const defaultBounds = {
    north: 40.917577,
    south: 40.477399,
    east: -73.700272,
    west: -74.25909,
  }; // Bounds for New York City

  return (
    <>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <div className="navigation-container">
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10}
          >
            {/* Add DirectionService and DirectionsRenderer components */}
            {directions && (
              <DirectionsService
                options={{
                  destination: destination,
                  origin: origin,
                  travelMode: "DRIVING",
                  minZoom: 10, // Set the minimum zoom level
                  maxZoom: 10, // Set the maximum zoom level
                }}
                callback={handleDirectionsResponse}
              />
            )}
            {directions &&
            directions.routes.slice(0, 2).map((route, index) => (
              <DirectionsRenderer
                key={index}
                options={{
                  directions: directions,
                  routeIndex: index,
                }}
              />
            ))}

            {segmentsPaths.length > 0 &&
              segmentsPaths.map((elem, index) => {
                const handlePolylineClick = (e) => {
                  setSelectedPolyline(elem);
                };

                const middleIndex = Math.floor(elem.points.length / 2);
                const PathOptions = {
                  strokeOpacity: 0.8,
                  strokeWeight: 8,
                  fillColor: "#FF0000",
                  fillOpacity: 0.35,
                  clickable: true,
                  draggable: false,
                  editable: false,
                  visible: true,
                  radius: 30000,
                  zIndex: 1,
                  disableDoubleClickZoom: true,
                };
                PathOptions.strokeColor = colors[elem.dangerLevel];
                return (
                  <React.Fragment key={index}>
                    <Polyline
                      path={elem.points}
                      options={PathOptions}
                      onClick={handlePolylineClick}
                      onDblClick={(e) => e.stop()}
                    />

                    {selectedPolyline === elem && (
                      <Marker
                        position={elem.points[middleIndex]}
                        icon={{
                          // url: '/custom-marker.png', // Path to your custom marker icon
                          scaledSize: new window.google.maps.Size(50, 50), // Size of the marker icon
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </GoogleMap>

          <div className="navigation-search">
            <StandaloneSearchBox
              bounds={defaultBounds}
              onLoad={handleOriginSearchBoxLoad}
              onPlacesChanged={() => {
                const places = originSearchBoxRef.current.getPlaces();
                if (places.length > 0) {
                  const place = places[0];
                  setOrigin(place.geometry.location);
                }
              }}
            >
              <input type="text" placeholder="Search for origin" />
            </StandaloneSearchBox>

            {/* Add StandaloneSearchBox for destination */}
            <StandaloneSearchBox
              bounds={defaultBounds}
              onLoad={handleDestinationSearchBoxLoad}
              onPlacesChanged={() => {
                const places = destinationSearchBoxRef.current.getPlaces();
                if (places.length > 0) {
                  const place = places[0];
                  setDestination(place.geometry.location);
                }
              }}
            >
              <input type="text" placeholder="Search for destination" />
            </StandaloneSearchBox>
            {/* Add search button */}
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default NavigationPage;
