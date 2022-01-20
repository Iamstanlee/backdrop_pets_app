import React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Heart} from 'phosphor-react-native';
import {Colors, kFontFamily} from '../constants';
import {useFavouriteContext} from '../context/favourite_context';
import LoadingIndicator from '../components/loading_indicator';
import {Dog} from '../types';

const Favourite = () => {
  const kWidth = Dimensions.get('window').width;
  const kColumn = 2;
  const kTile = kWidth / kColumn - 24;
  const {favourite} = useFavouriteContext();

  if (!favourite) return <LoadingIndicator />;

  if (favourite.length === 0)
    return (
      <View style={{...styles.container, alignItems: 'center'}}>
        <View
          style={{
            marginBottom: 10,
            padding: 24,
            borderRadius: 10,
            backgroundColor: '#ddd',
          }}>
          <Heart color="#fff" size={36} />
        </View>
        <Text style={{fontFamily: kFontFamily}}>
          Your liked items would show here
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={favourite}
        numColumns={kColumn}
        key={kColumn}
        keyExtractor={(item, index) => [item.name, index].join('.')}
        renderItem={({item: dog}) => <FavouriteItem dog={dog} size={kTile} />}
      />
    </View>
  );
};

export default Favourite;

const FavouriteItem: React.FC<{
  dog: Dog;
  size: number;
}> = ({
  dog: {
    name,
    image: {url},
  },
  size,
}) => (
  <View style={{width: size, ...styles.item}}>
    <Image
      style={{
        borderRadius: 10,
        width: size,
        height: size,
      }}
      source={{uri: url ?? 'https://place-hold.it/40x40?text=x'}}
    />
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
      }}>
      <Text numberOfLines={1} style={styles.catText}>
        {name}
      </Text>
      <TouchableOpacity>
        <Heart color={Colors.kRed} weight="fill" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  item: {
    flex: 0.5,
    marginBottom: 12,
    marginHorizontal: 12,
  },
  catText: {
    fontSize: 16,
    fontFamily: kFontFamily,
    color: Colors.kBlack,
  },
});
