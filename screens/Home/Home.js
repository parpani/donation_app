import React,{useState, useEffect} from 'react';
import {SafeAreaView,ScrollView,View, Pressable, Text, Image, StyleSheet, FlatList} from 'react-native';
import { Routes } from '../../navigation/Routes';

//import style from './style';
import globalStyle from '../../assets/styles/globalStyle';
import { horizontalScale } from '../../assets/styles/scaling';
import style from './styles';

import SingleDonationItem from '../../components/SingleDonationItem/SingleDonationItem';
import Search from '../../components/Search/Search';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab/Tab';

// Importing the useSelector and useDispatch hooks from the React Redux library
// The useSelector hook allows us to select and retrieve data from the store
// The useDispatch hook allows us to dispatch actions to update the store
import { useDispatch, useSelector} from 'react-redux';
import { updateFirstName, updateLastName, resetToInitialState } from '../../redux/reducers/User';
import { updateSelectedCategoryId } from '../../redux/reducers/Categories';
import { updateSelectedDonationId } from '../../redux/reducers/Donations';

const Home = ({navigation}) => {
  
  // Using the useDispatch hook to get a reference to the dispatch function
  // This function allows us to dispatch actions to update the store
  const dispatch = useDispatch();
  //dispatch(resetToInitialState());   //Use this when you have added any values in the store, it will only reflect the changes when u dispatch this function, can comment it after dispatching it
  
  // Using the useSelector hook to select the "user" slice of the store
  // This will return the user object containing firstName, lastName and userId fields
  const user = useSelector(state => state.user);
  //console.log(user);
  const categories = useSelector(state => state.categories);
  //console.log(categories);
  const donations = useSelector(state => state.donations);
  //console.log(donations);
 
//For Categories  
  //Making a pagination function for lazy loading. no need to load all the data from the start
  const [categoryPage, setCategoryPage] = useState(1);   //current page number, will start eith one and will increase as and when data is fetched
  const [categoryList, setCategoryList] = useState([]);  //new pagination data will be stored here and then rendered via this
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);   //if true, it won't try to get more data and wait till all the data is loaded
  const categoryPageSize = 4;   //number of items to load at a time

  useEffect(() => {   //will run as soon as pages get loaded
    setIsLoadingCategories(true);   //loader and checker
    setCategoryList(          //get data that needs to be rendered
      pagination(categories.categories, categoryPage, categoryPageSize),  //calling pagination function to divide all the elements in slices of 4, (data to be rendered, current page number, total elements to be shown par page)
    );
    setCategoryPage(prev => prev + 1);
    setIsLoadingCategories(false);
  }, []);

  const pagination = (items, pageNumber, pageSize) => {   //pagination(elements to be , current page number, total pagesize(4))
    const startIndex = (pageNumber - 1) * pageSize;   //setting start index from where elemenets needs to be rendered for a particular page, endindex given below
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) {
      return [];
    }
    return items.slice(startIndex, endIndex);
  };

//For Donation Items to be displayed as per Category selected
  const [donationItems, setDonationsItem] = useState([]);

  useEffect(()=>{
    const items = donations.items;
    const filteredItems = items.filter(value => 
      value.categoryIds.includes(categories.selectedCategoryId),
    )
    setDonationsItem(filteredItems);
    //console.log(filteredItems);
  },[categories.selectedCategoryId])

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={style.header}>
          <View>
            <Text style={style.headerIntroText}>Hello, </Text>
            <View style={style.username}>
              <Header title={user.firstName + ' ' + user.lastName[0] + '. 👋'} />
            </View>
          </View>
          <Image
            source={{uri: user.profileImage}}
            style={style.profileImage}
            resizeMode={'contain'}
          />
        </View>

        <View style={style.searchBox}>
          <Search />
        </View>

        <Pressable style={style.highlightedImageContainer}>
          <Image
            style={style.highlightedImage}
            source={require('../../assets/images/highlighted_image.png')}
            resizeMode={'contain'}
          />
        </Pressable>
        
        <View style={style.categoryHeader}>
          <Header title={'Select Category'} type={2} />
        </View>

        <View style={style.categories}>
          <FlatList
            onEndReachedThreshold={0.5}   //onReached fn will be called when the user has scrolled through 50% of the current rendered data
            onEndReached={() => {
              if (isLoadingCategories) {
                return;
              }
              //console.log('User has reached the end and we are getting more data for page number ',categoryPage,);
              setIsLoadingCategories(true);
              let newData = pagination(categories.categories,categoryPage,categoryPageSize); //first time the data(4 elements) will be shown from the flatlist
              if (newData.length > 0) {
                setCategoryList(prevState => [...prevState, ...newData]);
                setCategoryPage(prevState => prevState + 1);
              }
              setIsLoadingCategories(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            //data={categories.categories}  //for showing all data
            data={categoryList} //showing only 4 elements as per the pagination
            renderItem={({item}) => (
              <View style={style.categoryItem} key={item.categoryId}>
                <Tab
                  tabId={item.categoryId}
                  onPress={value => dispatch(updateSelectedCategoryId(value))}
                  title={item.name}
                  isInactive={item.categoryId !== categories.selectedCategoryId}
                />
              </View>
            )}
          />
        </View>

        {donationItems.length > 0 && (
          <View style={style.donationItemsContainer}>
            {donationItems.map(value => {

              const categoryInformation = categories.categories.find(
                val => val.categoryId === categories.selectedCategoryId,
              );

              return (
                <View key={value.donationItemId} style={style.singleDonationItem}>
                  <SingleDonationItem
                    onPress={selectedDonationId => {
                      dispatch(updateSelectedDonationId(selectedDonationId));   //Fetching the information of the sleected item in the donationitemspage
                      navigation.navigate(Routes.SingleDonationItem, {categoryInformation});
                    }}
                    donationItemId={value.donationItemId}
                    uri={value.image}
                    donationTitle={value.name}
                    badgeTitle={
                      categories.categories.filter(val => val.categoryId === categories.selectedCategoryId)[0].name
                    }
                    price={parseFloat(value.price)}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;


  //Practice of Rexux start--------:

          /* <Search onSearch={value => {
          console.log(value);
        }}/> *
  //       <View style={{flexDirection: 'row',justifyContent: 'space-between',paddingHorizontal: horizontalScale(24),}}>
  //       <SingleDonationItem
  //         uri={'https://img.pixers.pics/pho_wat(s3:700/FO/44/24/64/31/700_FO44246431_ab024cd8251bff09ce9ae6ecd05ec4a8.jpg,525,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,305,650,jpg)/stickers-cactus-cartoon-illustration.jpg.jpg'}
  //         badgeTitle={'Environment'}
  //         donationTitle={'Tree Cactus'}
  //         price={44}
  //       />
  //       <SingleDonationItem
  //         uri={'https://img.pixers.pics/pho_wat(s3:700/FO/44/24/64/31/700_FO44246431_ab024cd8251bff09ce9ae6ecd05ec4a8.jpg,525,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,305,650,jpg)/stickers-cactus-cartoon-illustration.jpg.jpg'}
  //         badgeTitle={'Environment'}
  //         donationTitle={'Tree Cactus'}
  //         price={44}
  //       />
 
  //     </View>
  //     <Header title={'Meet'}/>
  //     {/* {user} */
  //     <Header title={user.firstName + ' ' + user.lastName}/>
      
  //     {/*dispatching updateFirstName action to the User so that our state gets updated with the new first name we want to use*/}
  //     <Pressable onPress={() => dispatch(updateFirstName({firstName: 'Meet'}))}>
  //       <Text>Press me to change first name</Text>
  //     </Pressable>
  //     <Pressable onPress={() => dispatch(updateLastName({lastName: 'P'}))}>
  //       <Text>Press me to change last name</Text>
  //     </Pressable>

// Practice of Redux End:---------------

//   import Header from '../../components/Header/Header';
// import Button from '../../components/Button/Button';
// import Tab from '../../components/Tab/Tab';
// import Badge from '../../components/Badge/Badge';
// import Search from '../../components/Search/Search';

// import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

// const Home = () => {
//   return()
//   <View>
// <Text>Hello World!</Text>
// </View>
// <Header title={'Azzahri A.'} type={1} />
// <Header title={'Azzahri A.'} type={2} />
// <Header title={'Azzahri A.'} type={3} />
// <Button
// title={'Donate'}
// onPress={() => {
//   console.log('You just pressed me!');
// }}
// />
// <Button title={'Donate'} isDisabled={true} />
// <Tab title={'Highlight'} />
// <Tab title={'Highlight'} isInactive={true} />
// <Badge title={'Environment'} />
// <FontAwesomeIcon icon={faSearch} /> 

// const style = create StyleSheet ({
//   title1: {
//     fontFamily: 'Inter',
//     fontSize: scaleFontSize(24),
//     lineHeight: scaleFontSize(29),
//     fontWeight: '600',
//   },
//   title2: {
//     fontFamily: 'Inter',
//     fontSize: scaleFontSize(18),
//     lineHeight: scaleFontSize(22),
//     fontWeight: '600',
//   },
//   title3: {
//     fontFamily: 'Inter',
//     fontSize: scaleFontSize(16),
//     lineHeight: scaleFontSize(19),
//     fontWeight: '600',
//   },
// })

// export default Home
// )};