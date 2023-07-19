import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
    return(
        //拼接styles.card和props.style样式，card用的格式<Card>...</Card>
        <View style = {{...styles.card, ...props.style}}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    card: {
        elevation: 5, //阴影厚度（仅安卓，ios用shadow..）
        backgroundColor: 'white',
        padding:20,
        borderRadius:10
    }
})

export default Card;