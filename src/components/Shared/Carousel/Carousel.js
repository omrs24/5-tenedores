import React, { useState } from "react";
import { Text, View } from "react-native";
import { Image } from "@rneui/base";
import CarouselSnap, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";
import { styles } from "./Carousel.styles";

export function Carousel(props) {
  const { images, height, width, hideDots } = props;
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(images)}
        activeDotIndex={activeDotIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
      />
    );
  };

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout="default"
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />

      {!hideDots && pagination()}
    </View>
  );
}
