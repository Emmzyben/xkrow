import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserProvider from '../backend/user';

import Home from '../screens/start/home';
import Login from '../screens/start/login';
import Register from '../screens/start/register';
import Forgot from '../screens/start/forgot';
import Landing from '../screens/start/landing';
import EnterCode from '../screens/start/entercode';
import EnterCode1 from '../screens/start/entercode1';
import AdvertVideo from '../screens/start/advertVideo';
// Buyer pages
import Buyer1 from '../screens/buyer/buyer1';
import Buyer2 from '../screens/buyer/buyer2';
import Buyer3 from '../screens/buyer/buyer3';
import Details from '../screens/buyer/details';
import Details2 from '../screens/buyer/details2';
// Vendor pages
import Vendor1 from '../screens/vendor/vendor1';
import Vendors from '../screens/vendor/vendors';
import VendorProfile from '../screens/vendor/VendorProfile';
import Vendors2 from '../screens/vendor/vendors2';
import VendorProfile2 from '../screens/vendor/VendorProfile2';

// Contractor page
import Contractor from '../screens/contractor/contractor';

// Professionals pages
import Professionals1 from '../screens/professionals/professionals1';
import Professionals2 from '../screens/professionals/professionals2';

// Chatbox page
import Chatbox from '../screens/chatbox/chatbox';
import ChatScreen from '../screens/chatbox/chatScreen';
import Notification from '../screens/chatbox/notification';
// KYC pages
import Page1 from '../screens/kyc/page1';
import Page2 from '../screens/kyc/page2';
import Page3 from '../screens/kyc/page3';
import Page4 from '../screens/kyc/page4';
import Page5 from '../screens/kyc/page5';
import Page6 from '../screens/kyc/page6';

// Wallet pages
import Wallet from '../screens/wallet/wallet';
import Fund from '../screens/wallet/fund';
import Withdraw from '../screens/wallet/withdraw';
import FundTransactions from '../screens/wallet/fundTransactions';
import TransactionDetailsPage from '../screens/wallet/TransactionDetailsPage';
//profile pages
import Profile from '../screens/profile/profile';
import Profile2 from '../screens/profile/profile2';
import Profile3 from '../screens/profile/profile3';
import ProductDetails from '../screens/profile/profiledetails';

//main profile
import Mainpage from '../screens/mainProfile/mainpage';
import Support from '../screens/mainProfile/support';
import Kycpage from '../screens/mainProfile/kyc';
import PasswordReset from '../screens/mainProfile/passwordReset';
import Biopage from '../screens/mainProfile/biopage';

//proffession page
import ProfProfile1 from '../screens/professionalProfile/profprofile1';
import ProfProfile2 from '../screens/professionalProfile/profprofile2';
import ProfProfile3 from '../screens/professionalProfile/profprofile3';
import ProfProductDetails from '../screens/professionalProfile/profprofiledetails';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
    <UserProvider>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="EnterCode" component={EnterCode} />
          <Stack.Screen name="EnterCode1" component={EnterCode1} />
          <Stack.Screen name="AdvertVideo" component={AdvertVideo} />
           {/*main profiles*/}
           <Stack.Screen name="Mainpage" component={Mainpage} />
          <Stack.Screen name="Biopage" component={Biopage} />
          <Stack.Screen name="PasswordReset" component={PasswordReset} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="Kycpage" component={Kycpage} />
          {/* Buyer pages */}
          <Stack.Screen name="Buyer1" component={Buyer1} />
          <Stack.Screen name="Buyer2" component={Buyer2} />
          <Stack.Screen name="Buyer3" component={Buyer3} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Details2" component={Details2} />

          {/* Vendor pages */}
          <Stack.Screen name="Vendor1" component={Vendor1} />
          <Stack.Screen name="Vendors" component={Vendors} />
          <Stack.Screen name="VendorProfile" component={VendorProfile} />
          <Stack.Screen name="Vendors2" component={Vendors2} />
          <Stack.Screen name="VendorProfile2" component={VendorProfile2} />
          {/* Contractor page */}
          <Stack.Screen name="Contractor" component={Contractor} />

          {/* Professionals pages */}
          <Stack.Screen name="Professionals1" component={Professionals1} />
          <Stack.Screen name="Professionals2" component={Professionals2} />

          {/* Chatbox page */}
          <Stack.Screen name="Chatbox" component={Chatbox} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="Notification" component={Notification} />
          {/* KYC pages */}
          <Stack.Screen name="Page1" component={Page1} />
          <Stack.Screen name="Page2" component={Page2} />
          <Stack.Screen name="Page3" component={Page3} />
          <Stack.Screen name="Page4" component={Page4} />
          <Stack.Screen name="Page5" component={Page5} />
          <Stack.Screen name="Page6" component={Page6} />

          {/* Wallet pages */}
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="Fund" component={Fund} />
          <Stack.Screen name="Withdraw" component={Withdraw} />
          <Stack.Screen name="FundTransactions" component={FundTransactions} />
          <Stack.Screen name="TransactionDetailsPage" component={TransactionDetailsPage} />

          {/*Profile pages*/}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Profile2" component={Profile2} />
          <Stack.Screen name="Profile3" component={Profile3} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />

          <Stack.Screen name="ProfProfile1" component={ProfProfile1} />
          <Stack.Screen name="ProfProfile2" component={ProfProfile2} />
          <Stack.Screen name="ProfProfile3" component={ProfProfile3} />
          <Stack.Screen name="ProfProductDetails" component={ProfProductDetails} />
        </Stack.Navigator>
       </UserProvider>
       </NavigationContainer>
   
  );
};

export default StackNavigator;
