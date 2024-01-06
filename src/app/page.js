"use client"
import React, { useState } from "react";
import 'semantic-ui-css/semantic.min.css';

import axios from "axios";
import {
  GridColumn,
  FormGroup,
  FormField,
  Button,
  Divider,
  Form,
  Grid,
  Segment,
} from "semantic-ui-react";

function CatDogDataPage() {
  const myStyles = {
    color: "Black",
    fontSize: "18px",
    border: "1px solid black",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "lightgray",
  };
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const handleCheckboxChange = async (animal) => {
    setSelectedAnimal(animal);
    setSubmitClicked(false);
  };

  const handleSubmit = async () => {
    try {
      if (selectedAnimal) {
        const response = await axios.get(
          selectedAnimal === "cat"
            ? "https://catfact.ninja/fact"
            : "https://dog.ceo/api/breeds/image/random"
        );

        setResultData(response.data);
        setSubmitClicked(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <GridColumn>
          <Form>
            <FormGroup grouped>
              <label>Choose one Cat OR Dog</label>
              <FormField
                label="Cat"
                control="input"
                type="radio"
                name="animal"
                onChange={() => handleCheckboxChange("cat")}
              />
              <FormField
                label="Dog"
                control="input"
                type="radio"
                name="animal"
                onChange={() => handleCheckboxChange("dog")}
              />
            </FormGroup>

            <Button content="Submit" primary onClick={handleSubmit} />
          </Form>
        </GridColumn>

        <GridColumn verticalAlign="middle">
          {submitClicked && resultData && (
            <div>
              {selectedAnimal === "cat" ? (
                <div style={myStyles}>{resultData.fact}</div>
              ) : (
                <img
                  src={resultData.message}
                  alt="Click on submit"
                  width={"300px"}
                  height={"300px"}
                />
              )}
            </div>
          )}
        </GridColumn>
      </Grid>

      <Divider vertical>||</Divider>
    </Segment>
  );
}

export default CatDogDataPage;