// import { getFontFamily } from "./assets/fonts/helper"
import React, {useState, useEffect} from 'react';
import { TouchableOpacity, View, Text,FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Title from './components/Title/Title';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import globalStyle from './assets/styles/globalStyle';
import UserStory from './components/UserStory/UserStory';

const userStories = [
    {
      firstName: 'Prasad',
      id: 1,
      profileImage: require('./assets/images/Pundalik Desai IT.jpg'),
    },//0
    {
      firstName: 'Om',
      id: 2,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'sahil',
      id: 3,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'ram',
      id: 4,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'raj',
      id: 5,
      profileImage: require('./assets/images/default_profile.png'),
    },//04
    {
      firstName: 'yash',
      id: 6,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'tejas',
      id: 7,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'jai',
      id: 8,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'ajay',
      id: 9,
      profileImage: require('./assets/images/default_profile.png'),
    },//08
  ];
const userPosts = [
  {
    firstName: 'Prasad',
    lastName: 'Deshmukh',
    location: 'Pune, Maharashtra',
    likes: 980,
    comments: 18,
    bookmarks: 22,
    image: require('./assets/images/Pundalik Desai IT.jpg'),
    id: 1,
  },
  {
    firstName: 'Sneha',
    lastName: 'Jadhav',
    location: 'Mumbai, Maharashtra',
    likes: 1450,
    comments: 30,
    bookmarks: 40,
    image: require('./assets/images/Pundalik Desai IT.jpg'),
    id: 2,
  },
  {
    firstName: 'Rohit',
    lastName: 'Patil',
    location: 'Kolhapur, Maharashtra',
    likes: 320,
    comments: 10,
    bookmarks: 7,
    image: require('./assets/images/Pundalik Desai IT.jpg'),
    id: 3,
  },
  {
    firstName: 'Aishwarya',
    lastName: 'Shinde',
    location: 'Nashik, Maharashtra',
    likes: 600,
    comments: 14,
    bookmarks: 9,
    image: require('./assets/images/Pundalik Desai IT.jpg'),
    id: 4,
  },
  {
    firstName: 'Omkar',
    lastName: 'Chavan',
    location: 'Nagpur, Maharashtra',
    likes: 2100,
    comments: 42,
    bookmarks: 15,
    image: require('./assets/images/Pundalik Desai IT.jpg'),
    id: 5,
  },
];

const App = () => {
  
  const userStoriesPageSize = 4;
  const [userStoriesCurrentPage, setUserStoriesCurrentPage] = useState(1);
  const [userStoriesRenderedData, setUserStoriesRenderedData] = useState([]);
  const [isLoadingUserStories, setIsLoadingUserStories] = useState(false);

  const userPostsPageSize = 4;
  const [userPostsCurrentPage, setUserPostsCurrentPage] = useState(1);
  const [userPostsRenderedData, setUserPostsRenderedData] = useState([]);
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(false);


  const pagination = (database, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= database.length) {
      return [];
    }
    return database.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setIsLoadingUserStories(true);
    const getInitialData = pagination(userStories, 1, userStoriesPageSize);
    setUserStoriesRenderedData(getInitialData);
    setIsLoadingUserStories(false);
  }, []);


  return (
    <SafeAreaView>
      <View style={globalStyle.header}>
        <Title title={'Let’s Explore'} />
        <TouchableOpacity style={globalStyle.messageIcon}>
          <FontAwesomeIcon icon={faEnvelope} size={20} color={'#898DAE'} />
          <View style={globalStyle.messageNumberContainer}>
            <Text style={globalStyle.messageNumber}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={globalStyle.userStoryContainer}>
        <FlatList
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (isLoadingUserStories) {
              return;
            }
            setIsLoadingUserStories(true);
            const contentToAppend = pagination(
              userStories,
              userStoriesCurrentPage + 1,
              userStoriesPageSize,
            );
            if (contentToAppend.length > 0) {
              setUserStoriesCurrentPage(userStoriesCurrentPage + 1);
              setUserStoriesRenderedData(prev => [...prev, ...contentToAppend]);
            }
            setIsLoadingUserStories(false);
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={userStoriesRenderedData}
          renderItem={({item}) => (
            <UserStory
              key={'userStory' + item.id}
              firstName={item.firstName}
              profileImage={item.profileImage}
            />
          )}
        />
      </View>

    </SafeAreaView>
  );
};
export default App;