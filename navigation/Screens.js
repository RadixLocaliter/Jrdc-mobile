import React from 'react';
import { Block } from "galio-framework";
import { Easing, Animated, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// screens
import Home from '../screens/Home';
import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Components from '../screens/Components';
import Articles from '../screens/Articles';
import Onboarding from '../screens/Onboarding';
import SettingsScreen from '../screens/Settings';

import WaterSample from '../screens/WaterSample/Home';
import AccommodationsType from "../screens/Accommodations/Type"
import Room from "../screens/Accommodations/Room"
import ConfirmRequest from "../screens/Accommodations/ConfirmRequest"
import Inventory from "../screens/Inventory/Inventory"
import InventoryItem from "../screens/Inventory/Item"
import Auditorium from "../screens/Auditorium/MeetingRooms"
import MeetingRoom from "../screens/Auditorium/Room"
import MeetingRoomRequest from "../screens/Auditorium/ConfirmRequest"
import GuestHome from "../screens/GuestHome"
import Labs from "../screens/Laboratory/Labs"
import Lab from "../screens/Laboratory/Lab"
import LabRequest from "../screens/Laboratory/ConfirmRequest"
import LabUserRequest from "../screens/Laboratory/Home"
import AccommodationsRequest from "../screens/Accommodations/Home"
import MeetingRoomsUserRequest from '../screens/Auditorium/Home'
import News from '../screens/News'

import RequestWaterTest from '../screens/WaterSample/SubmitTest'
import WaterTestRequest from "../screens/WaterSample/ConfirmRequestTest"
import WaterSampleRequest from "../screens/WaterSample/SubmitSample"
import WaterSampleConfirmRequest from "../screens/WaterSample/ConfirmRequestSample"
import Upload from "../screens/UploadFile"
import LabCategory from "../screens/Laboratory/LabCategory"
import BenchHome from "../screens/Bench/Home"
import BenchType from "../screens/Bench/MeetingRooms"
import Bench from "../screens/Bench/Room"
import BenchConfirmRequest from "../screens/Bench/ConfirmRequest"

import PilotHome from "../screens/Pilot/Home"
import PilotType from "../screens/Pilot/MeetingRooms"
import Pilot from "../screens/Pilot/Room"
import PilotConfirmRequest from "../screens/Pilot/ConfirmRequest"
import WaterRequestPayment from "../screens/WaterSample/WaterRequestPayment"


// drawer
import CustomDrawerContent from "./Menu";
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from "../constants";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Components" mode="card" headerMode="screen">
      <Stack.Screen
        name="Components"
        component={Components} options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          backgroundColor: "#FFFFFF"
        }} />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator initialRouteName="Articles" mode="card" headerMode="screen">
      <Stack.Screen name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF'
        }} />
    </Stack.Navigator>
  );
}
function UploadStack(props) {
  return (
    <Stack.Navigator initialRouteName="upload" mode="card" headerMode="screen">
      <Stack.Screen name="upload"
        component={Upload}
        options={{
          header: ({ navigation, scene }) => (
            <Header
            back
            title="Upload Payment slip"
            navigation={navigation}
            scene={scene} />
          ),
          backgroundColor: '#FFFFFF'
        }} />
    </Stack.Navigator>
  );
}

function AccountStack(props) {
  return (
    <Stack.Navigator initialRouteName="Account" mode="card" headerMode="screen">
      <Stack.Screen
        name="Account"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Create Account"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function GuestHomeStack(props) {
  return (
    <Stack.Navigator initialRouteName="GuestHome" mode="card" headerMode="screen">
      <Stack.Screen
        name="GuestHome"
        component={GuestHome}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Guest"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function BenchHomeStack(props) {
  return (
    <Stack.Navigator initialRouteName="Benching Area" mode="card" headerMode="screen">
      <Stack.Screen
        name="Benching Area"
        component={BenchHome}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Benching Request"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function BenchTypeStack(props) {
  return (
    <Stack.Navigator initialRouteName="BenchType" mode="card" headerMode="screen">
      <Stack.Screen
        name="BenchType"
        component={BenchType}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Benching Area"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function BenchStack(props) {
  return (
    <Stack.Navigator initialRouteName="Bench" mode="card" headerMode="screen">
      <Stack.Screen
        name="Bench"
        component={Bench}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Bench"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function BenchConfirmRequestStack(props) {
  return (
    <Stack.Navigator initialRouteName="BenchConfirmRequest" mode="card" headerMode="screen">
      <Stack.Screen
        name="BenchConfirmRequest"
        component={BenchConfirmRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Confirm Request"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function PilotHomeStack(props) {
  return (
    <Stack.Navigator initialRouteName="Pilot Area" mode="card" headerMode="screen">
      <Stack.Screen
        name="Pilot Area"
        component={PilotHome}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Pilot Area Request"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function PilotTypeStack(props) {
  return (
    <Stack.Navigator initialRouteName="PilotAreaType" mode="card" headerMode="screen">
      <Stack.Screen
        name="PilotAreaType"
        component={PilotType}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Pilot Area"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function PilotStack(props) {
  return (
    <Stack.Navigator initialRouteName="Pilot" mode="card" headerMode="screen">
      <Stack.Screen
        name="Pilot"
        component={Pilot}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Pilot"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function PilotConfirmRequestStack(props) {
  return (
    <Stack.Navigator initialRouteName="PilotConfirmRequest" mode="card" headerMode="screen">
      <Stack.Screen
        name="PilotConfirmRequest"
        component={PilotConfirmRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Confirm Request"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function AccommodationsStack(props) {
  return (
    <Stack.Navigator initialRouteName="AccommodationsType" mode="card" headerMode="screen">
      <Stack.Screen
        name="AccommodationsType"
        component={AccommodationsType}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Accommodations"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function AccommodationsUserRequestStack(props) {
  return (
    <Stack.Navigator initialRouteName="Accommodations" mode="card" headerMode="screen">
      <Stack.Screen
        name="Accommodations"
        component={AccommodationsRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Accommodations Request"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function MeetingRoomsStack(props) {
  return (
    <Stack.Navigator initialRouteName="MeetingRoomType" mode="card" headerMode="screen">
      <Stack.Screen
        name="MeetingRoomType"
        component={Auditorium}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Meeting Rooms"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function MeetingRoomsUserRequestStack(props) {
  return (
    <Stack.Navigator initialRouteName="Meeting Rooms" mode="card" headerMode="screen">
      <Stack.Screen
        name="Meeting Rooms"
        component={MeetingRoomsUserRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Meeting Rooms Request"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function MeetingRoomStack(props) {
  return (
    <Stack.Navigator initialRouteName="MeetingRoom" mode="card" headerMode="screen">
      <Stack.Screen
        name="MeetingRoom"
        component={MeetingRoom}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Meeting Rooms"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function LabUserRequestStack(props) {
  return (
    <Stack.Navigator initialRouteName="Laboratory" mode="card" headerMode="screen">
      <Stack.Screen
        name="Laboratory"
        component={LabUserRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Laboratory Request"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function LabsStack(props) {
  return (
    <Stack.Navigator initialRouteName="LaboratoryType" mode="card" headerMode="screen">
      <Stack.Screen
        name="LaboratoryType"
        component={Labs}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Laboratory"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function LabsCategoryStack(props) {
  return (
    <Stack.Navigator initialRouteName="LaboratoryCategory" mode="card" headerMode="screen">
      <Stack.Screen
        name="LaboratoryCategory"
        component={LabCategory}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Lab Reservation"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function LabStack(props) {
  return (
    <Stack.Navigator initialRouteName="Lab" mode="card" headerMode="screen">
      <Stack.Screen
        name="Lab"
        component={Lab}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Lab"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function LabRequestStack(props) {
  return (
    <Stack.Navigator initialRouteName="LabRequest" mode="card" headerMode="screen">
      <Stack.Screen
        name="LabRequest"
        component={LabRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Confirm Request"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function MeetingRoomRequestStack(props) {
  return (
    <Stack.Navigator initialRouteName="MeetingRoomRequest" mode="card" headerMode="screen">
      <Stack.Screen
        name="MeetingRoomRequest"
        component={MeetingRoomRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Confirm Request"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function RoomStack(props) {
  return (
    <Stack.Navigator initialRouteName="Room" mode="card" headerMode="screen">
      <Stack.Screen
        name="Room"
        component={Room}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Room"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function InventoryStack(props) {
  return (
    <Stack.Navigator initialRouteName="Inventory" mode="card" headerMode="screen">
      <Stack.Screen
        name="Inventory"
        component={Inventory}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Inventory"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function InventoryItemStack(props) {
  return (
    <Stack.Navigator initialRouteName="InventoryItem" mode="card" headerMode="screen">
      <Stack.Screen
        name="InventoryItem"
        component={InventoryItem}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Item"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function ConfirmRequestStack(props) {
  return (
    <Stack.Navigator initialRouteName="ConfirmRequest" mode="card" headerMode="screen">
      <Stack.Screen
        name="ConfirmRequest"
        component={ConfirmRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="Confirm Request"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function WaterSampleStack(props) {
  return (
    <Stack.Navigator initialRouteName="Water Test" mode="card" headerMode="screen">
      <Stack.Screen name="Water Test"
        component={WaterSample}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Water Test/Sample Request" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF'
        }} />
    </Stack.Navigator>
  );
}
function WaterSampleTestStack(props) {
  return (
    <Stack.Navigator initialRouteName="RequestWaterTest" mode="card" headerMode="screen">
      <Stack.Screen name="RequestWaterTest"
        component={RequestWaterTest}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Request Water Test" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF'
        }} />
    </Stack.Navigator>
  );
}
function WaterSampleSubmitStack(props) {
  return (
    <Stack.Navigator initialRouteName="RequestWaterSample" mode="card" headerMode="screen">
      <Stack.Screen name="RequestWaterSample"
        component={WaterSampleRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Request Water Sample" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF'
        }} />
    </Stack.Navigator>
  );
}
function WaterSampleTestRequestStack(props) {
  return (
    <Stack.Navigator initialRouteName="WaterTestRequest" mode="card" headerMode="screen">
      <Stack.Screen name="WaterTestRequest"
        component={WaterTestRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Confirm Request" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF'
        }} />
    </Stack.Navigator>
  );
}
function WaterSampleRequestConfirmStack(props) {
  return (
    <Stack.Navigator initialRouteName="WaterSampleConfirmRequest" mode="card" headerMode="screen">
      <Stack.Screen name="WaterSampleConfirmRequest"
        component={WaterSampleConfirmRequest}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Confirm Request" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF'
        }} />
    </Stack.Navigator>
  );
}
function WaterRequestPaymentStack(props) {
  return (
    <Stack.Navigator initialRouteName="WaterRequestPayment" mode="card" headerMode="screen">
      <Stack.Screen name="WaterRequestPayment"
        component={WaterRequestPayment}
        options={{
          header: ({ navigation, scene }) => (
            <Header back title="Request Payment" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF'
        }} />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}
function NewsStack(props) {
  return (
    <Stack.Navigator initialRouteName="News" mode="card" headerMode="screen">
      <Stack.Screen
        name="News"
        component={News}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              back
              transparent
              title="News"
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              //  search
              //  options             
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.APP_BACKGROUND,
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Components" component={ComponentsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Account" component={AccountStack} />
      <Drawer.Screen name="Water Test" component={WaterSampleStack} />

      <Drawer.Screen name="AccommodationsType" component={AccommodationsStack} />
      <Drawer.Screen name="Room" component={RoomStack} />
      <Drawer.Screen name="ConfirmRequest" component={ConfirmRequestStack} />
      <Drawer.Screen name="Inventory" component={InventoryStack} />
      <Drawer.Screen name="InventoryItem" component={InventoryItemStack} />

      <Drawer.Screen name="MeetingRoomType" component={MeetingRoomsStack} />
      <Drawer.Screen name="Meeting Rooms" component={MeetingRoomsUserRequestStack} />

      <Drawer.Screen name="MeetingRoom" component={MeetingRoomStack} />
      <Drawer.Screen name="MeetingRoomRequest" component={MeetingRoomRequestStack} />
      <Drawer.Screen name="LaboratoryType" component={LabsStack} />
      <Drawer.Screen name="Lab" component={LabStack} />
      <Drawer.Screen name="LabRequest" component={LabRequestStack} />
      <Drawer.Screen name="Accommodations" component={AccommodationsUserRequestStack} />
      <Drawer.Screen name="News" component={NewsStack} />
      <Drawer.Screen name="RequestWaterTest" component={WaterSampleTestStack} />  
      <Drawer.Screen name="WaterTestRequest" component={WaterSampleTestRequestStack} /> 
      <Drawer.Screen name="RequestWaterSample" component={WaterSampleSubmitStack} /> 
      <Drawer.Screen name="WaterSampleConfirmRequest" component={WaterSampleRequestConfirmStack} />  
      <Drawer.Screen name="upload" component={UploadStack} />   
      <Drawer.Screen name="LaboratoryCategory" component={LabsCategoryStack} />    
      <Drawer.Screen name="Benching Area" component={BenchHomeStack} />  
      <Drawer.Screen name="BenchType" component={BenchTypeStack} />    
      <Drawer.Screen name="Bench" component={BenchStack} />    
      <Drawer.Screen name="BenchConfirmRequest" component={BenchConfirmRequestStack} />  
      <Drawer.Screen name="Pilot Area" component={PilotHomeStack} />   
      <Drawer.Screen name="PilotAreaType" component={PilotTypeStack} />  
      <Drawer.Screen name="Pilot" component={PilotStack} />  
      <Drawer.Screen name="PilotConfirmRequest" component={PilotConfirmRequestStack} /> 
      <Drawer.Screen name="WaterRequestPayment" component={WaterRequestPaymentStack} />          

    </Drawer.Navigator>
  );
}


export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={props.token == null ? Onboarding : AppStack}
        option={{
          headerTransparent: true
        }}
      />
        {/* <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      /> */}
      <Stack.Screen name="App" component={AppStack} />    
      <Drawer.Screen name="Account" component={AccountStack} />
      <Drawer.Screen name="AccommodationsType" component={AccommodationsStack} />
      <Drawer.Screen name="Water Test" component={WaterSampleStack} />
      <Drawer.Screen name="Room" component={RoomStack} />
      <Drawer.Screen name="ConfirmRequest" component={ConfirmRequestStack} />
      <Drawer.Screen name="Inventory" component={InventoryStack} />
      <Drawer.Screen name="InventoryItem" component={InventoryItemStack} />
      
      <Drawer.Screen name="Meeting Rooms" component={MeetingRoomsStack} />
      <Drawer.Screen name="MeetingRoomType" component={MeetingRoomsStack} />
      <Drawer.Screen name="MeetingRoom" component={MeetingRoomStack} />
      <Drawer.Screen name="MeetingRoomRequest" component={MeetingRoomRequestStack} />

      <Drawer.Screen name="GuestHome" component={GuestHomeStack} />
      <Drawer.Screen name="LaboratoryType" component={LabsStack} />
      <Drawer.Screen name="Lab" component={LabStack} />
      <Drawer.Screen name="logout" component={Onboarding} />
      <Drawer.Screen name="LabRequest" component={LabRequestStack} />
      <Drawer.Screen name="Laboratory" component={LabUserRequestStack} />
      <Drawer.Screen name="Accommodations" component={AccommodationsUserRequestStack} />
      <Drawer.Screen name="News" component={NewsStack} />     
      <Drawer.Screen name="RequestWaterTest" component={WaterSampleTestStack} /> 
      <Drawer.Screen name="WaterTestRequest" component={WaterSampleTestRequestStack} /> 
      <Drawer.Screen name="RequestWaterSample" component={WaterSampleSubmitStack} /> 
      <Drawer.Screen name="WaterSampleConfirmRequest" component={WaterSampleRequestConfirmStack} />
      <Drawer.Screen name="upload" component={UploadStack} />  
      <Drawer.Screen name="LaboratoryCategory" component={LabsCategoryStack} />     
      <Drawer.Screen name="BenchingArea" component={BenchHomeStack} /> 
      <Drawer.Screen name="BenchType" component={BenchTypeStack} /> 
      <Drawer.Screen name="Bench" component={BenchStack} />   
      <Drawer.Screen name="BenchConfirmRequest" component={BenchConfirmRequestStack} />  
      <Drawer.Screen name="Pilot Area" component={PilotHomeStack} />  
      <Drawer.Screen name="PilotAreaType" component={PilotTypeStack} />  
      <Drawer.Screen name="Pilot" component={PilotStack} />  
      <Drawer.Screen name="PilotConfirmRequest" component={PilotConfirmRequestStack} />       
      <Drawer.Screen name="WaterRequestPayment" component={WaterRequestPaymentStack} />          
    </Stack.Navigator>
  );
}

