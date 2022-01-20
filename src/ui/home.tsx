import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Heart} from 'phosphor-react-native';
import {Colors, kFontFamily} from '../constants';
import {Dog} from '../types';
import {useFavouriteContext} from '../context/favourite_context';
import useFetch from '../hooks/use_fetch';
import LoadingIndicator from '../components/loading_indicator';
import Error from '../components/error';

const Home = () => {
  const [page, setPage] = useState(0);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const {addLiked} = useFavouriteContext();
  const {isLoading, isFetching, error, data} = useFetch<Dog[]>(page);

  useEffect(() => {
    setDogs(dogs.concat(data ?? []));
  }, [data]);

  if (isLoading) return <LoadingIndicator />;

  if (error) return <Error message={error as string} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={dogs}
        renderItem={({item: dog}) => (
          <DogItem
            dog={dog}
            onLike={() => addLiked!({...dog, isFavourite: true})}
          />
        )}
        keyExtractor={(item, index) => [item.name, index].join('.')}
        onEndReached={() => {
          if (data?.length !== 0) setPage(page => ++page);
        }}
        ListFooterComponent={
          isFetching ? (
            <Text
              style={{
                margin: 10,
                marginBottom: 14,
                fontSize: 16,
                fontFamily: kFontFamily,
                alignSelf: 'center',
                fontStyle: 'italic',
              }}>
              Loading more...
            </Text>
          ) : (
            <View />
          )
        }
      />
    </View>
  );
};

export default Home;

const DogItem: React.FC<{dog: Dog; onLike: () => void}> = ({
  dog: {
    name,
    image: {url},
  },
  onLike,
}) => (
  <View style={styles.item}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{uri: url ?? 'https://place-hold.it/40x40?text=x'}}
      />
      <Text style={styles.text}>{name}</Text>
    </View>
    <TouchableOpacity onPress={onLike}>
      <Heart />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 4,
  },
  item: {
    marginVertical: 12,
    marginHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    paddingLeft: 12,
    fontSize: 16,
    fontFamily: kFontFamily,
    color: Colors.kBlack,
  },
});
