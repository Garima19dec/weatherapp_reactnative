import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
  Text,
  SafeAreaView,FlatList
} from "react-native";
import React, { useState, useEffect } from "react";
import { fetchCountryDetails } from "../module/aapModule";
import { Formik } from "formik";
import * as yup from "yup";
import tw from "twrnc";
import { Button, Card, Paragraph } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useQuery } from "@tanstack/react-query";

const validationSchema = yup.object({
  country: yup.string().required("Required"),
});

export default function CountryDetail({ route, navigation }) {
  const [country, setCountry] = useState<string>("");
  const [showError, setShowError] = useState<null | string>(null);

  const {
    data,
    refetch: FindCountryDetails,
    isFetching,
  } = useQuery<any>(
    ["country-name", country],
    () => fetchCountryDetails(country),

    {
      enabled: false,
      onError: (err: any) => {
        Toast.show({
          type: "error",
          text1: "please enter valid country name",
        });
      },
    }
  );

  const getCityWeather = (capital: string | undefined) => {
    navigation.navigate("weather", { capital: capital });
  };



  return (
    <View>
      <ScrollView>
        <Formik
          initialValues={{ country: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            setCountry(values.country);

            if (country) {
              try {
                FindCountryDetails();
                // actions.resetForm();
              } catch (err) {
                console.log("err2", err);
              }
            }
          }}
        >
          {(props) => (
            <View style={styles.formStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter country"
                onChangeText={props.handleChange("country")}
                onBlur={props.handleBlur("country")}
                value={props.values.country}
                autoCorrect={false}
                autoCapitalize="none"
              />

              {props.errors.country && props.touched.country ? (
                <Text style={tw`text-red-600 p-2`}>{props.errors.country}</Text>
              ) : null}

              <Button
                mode="contained"
                style={tw`m-20px bg-red-900`}
                onPress={props.handleSubmit}
                disabled={!props.isValid}
                loading={isFetching}
              >
                Submit
              </Button>
            </View>
          )}
        </Formik>

        {data
          ? data.data.map((ele: any, index: any) => (
              <View key={index} style={tw`m-3`}>
                <Card>
                  <Card.Title title="Country Details" />
                  <Card.Content>
                    <Paragraph>Capital:{ele.capital}</Paragraph>
                    <Paragraph>Population:{ele.population} </Paragraph>
                    <Paragraph>Lating:{ele.latlng}</Paragraph>
                    <Image
                      style={tw`h-20px w-20px`}
                      source={{
                        uri: ele.flags.png,
                      }}
                    />
                  </Card.Content>
                  <Card.Actions>
                    <Button
                      mode="contained"
                      onPress={() => getCityWeather(ele.capital)}
                      style={{ backgroundColor: "#063970" }}
                    >
                      Capital Weather
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
            ))
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  formStyle: {
    backgroundColor: "rgb(229 229 229)",
    paddingHorizontal: 30,
    paddingTop: 45,
    paddingBottom: 35,
    margin: 15,
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  inputStyle: {
    borderWidth: 1,
    backgroundColor: "#fffff0",
    paddingHorizontal: 15,
    paddingVertical: 7,
    fontSize: 18,
  },
});
