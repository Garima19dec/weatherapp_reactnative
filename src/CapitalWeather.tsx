import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Paragraph, Button } from "react-native-paper";
import tw from "twrnc";
import { useQuery } from "@tanstack/react-query";
import { fetchCapitalDetails } from "../module/aapModule";
import Toast from "react-native-toast-message";

export default function CapitalWeather({ route }) {
  const { capital } = route.params;
  const [showError, setShowError] = useState<null | string>(null);

  const { data, isLoading, isFetching } = useQuery<any>(
    ["capital-name", capital],
    () => fetchCapitalDetails(capital),

    {
      onError: (err: any) => {
        setShowError(err.response.data.message || err);
      },
    }
  );

  if (isLoading)
    return <ActivityIndicator size="large" color="#0000ff" style={tw`mt-20`} />;

  const toastError = () => {
    setShowError(null);
  };

  if (showError) {
    Toast.show({
      type: "error",
      text1: "please enter valid country name",
    });
  }
  const timer = setTimeout(toastError, 4100);

  return (
    <View>
      <Card style={tw`m-4`}>
        <Card.Title title="Capital Weather Details" />
        <Card.Content>
          <Paragraph>
            Temperature: {data.data.current.temperature} °C|°F
          </Paragraph>
          <Paragraph>
            <Text>
              <Image
                style={tw`h-40px w-40px`}
                source={{
                  uri: data.data.current.weather_icons[0],
                }}
              />
            </Text>{" "}
            {data.data.current.wind_speed} km/h
          </Paragraph>
          <Paragraph>precipitation: {data.data.current.precip}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({});
