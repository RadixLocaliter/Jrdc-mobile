import { Platform, StatusBar } from 'react-native';
import { theme } from 'galio-framework';
const axios = require('axios');


export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 3.5 + (StatusHeight || 0);
export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);

export const SITE_URL="https://jrdc.lk/";
export const AUTH_USERNAME="ck_2e7f103d8189c0c69e615798996dbfd991a6b7de"
export const AUTH_PASSWORD="cs_9244f38ab75c9e91c86457b5484868d5608eca32"

export const axiosInstance = axios.create({
    baseURL: SITE_URL,
    auth: {
        username: AUTH_USERNAME,
        password: AUTH_PASSWORD
    }
});

export const axiosLoginInstance = axios.create({
    baseURL: SITE_URL,  
});

export const SITE_URL_INVENTORY="https://inventory.jrdc.lk/";
//export const AUTH_USERNAME=""
//export const AUTH_PASSWORD=""

export const axiosInstanceInventory = axios.create({
    baseURL: SITE_URL_INVENTORY,
});

export const SITE_URL_WATER="http://jrdc.bpositivelk.com/";

export const axiosInstanceWaterModule = axios.create({
    baseURL: SITE_URL_WATER,
});

export const RoomCategoryId=17;
export const MeetingRoomCategoryId=19;
export const LabsCategoryId=21;
export const BenchCategoryId=44;
export const PilotCategoryId=43;

