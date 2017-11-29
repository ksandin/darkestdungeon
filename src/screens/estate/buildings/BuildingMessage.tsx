import * as React from "react";
import {StyleSheet} from "aphrodite";
import {BannerHeader} from "../../../ui/BannerHeader";
import {grid} from "../../../config/Grid";

export function BuildingMessage ({children}: any) {
  return (
    <BannerHeader classStyle={styles.buildingMessage}>
      {children}
    </BannerHeader>
  );
}

const styles = StyleSheet.create({
  buildingMessage: {
    margin: grid.ySpan(1),
    padding: grid.gutter
  }
});