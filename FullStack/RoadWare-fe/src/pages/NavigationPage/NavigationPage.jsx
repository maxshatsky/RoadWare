import React from "react";
import { Button } from "react-bootstrap";
import "./NavigationPage.css";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";

const libraries = ["places"];

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
        },
        (response, status) => {
          if (status === "OK") {
            console.log(response)
            handleDirectionsResponse(response.routes[0].overview_path.map(cord=> console.log({ lng: cord.lng(), lat: cord.lat()})));
          } else {
            console.log("Directions request failed:", status);
          }
        }
      );
    }
  }, [origin, destination, handleDirectionsResponse]);

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
            { directions && <DirectionsService
              options={{
                destination: destination,
                origin: origin,
                travelMode: "DRIVING",
              }}
              callback={handleDirectionsResponse}
            />}
            {directions && (
              <DirectionsRenderer
                options={{
                  directions: directions,
                }}
              />
            )}
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
      )}{" "}
    </>
  );
}

export default NavigationPage;
