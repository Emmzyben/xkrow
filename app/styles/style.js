import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  home: {
    padding: 10,
    backgroundColor: '#62248F',
    color: 'white',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  }, 
  input10: {
    width: '87%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  input1: {
    width: '100%',
    padding: 7,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,fontSize:12
  },
  input2: {
    width: 'auto',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
  },
  link: {
    color: '#62248F',
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  link2: {
    color: '#62248F',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  login: {
    padding: 30,
    paddingTop:80,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    fontSize: 18,
    marginTop: 30,
    backgroundColor: '#62248F',
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
  },
  google: {
    marginTop: 40,
  },
  img: {
    height: 20,
    width: 20,
  },
  img1: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  inner: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
    padding: 10,
    borderRadius: 50,
  },
  kyc1: {
    backgroundColor: 'rgba(234, 236, 240, 1)',
    height: '100%',
    padding: 15, paddingTop:60
  },
  maincontainer: {
    margin: 15,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    padding: 15,
    shadowColor: 'rgba(16, 24, 40, 1)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  text1: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 28,
    textAlign: 'left',
    color: 'rgba(16, 24, 40, 1)',
  },
  text2: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 43,
    textAlign: 'left',
    color: 'rgba(16, 24, 40, 1)',
  },
  text3: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'left',
    color: 'rgba(102, 112, 133, 1)',
  },
  text4: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'left',
    color: 'rgba(98, 36, 143, 1)',
  },
  text5: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'left',
    color: 'rgba(16, 24, 40, 1)',
  },
  text25: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'right',
    color: 'rgba(16, 24, 40, 1)',
  },
  text6: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 35,
    textAlign: 'left',
    color: 'rgba(102, 112, 133, 1)',
  },
  text7: {
    fontSize: 11.5,
    fontWeight: '400',
    lineHeight: 15.69,
    textAlign: 'left',
    color: 'rgba(102, 112, 133, 1)',
  },
  text8: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgba(98, 36, 143, 1)',
    textDecorationLine: 'underline',
  },
  text9: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgba(102, 112, 133, 1)',
    flexWrap: 'wrap',
  },
  steps: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsUnder: {
    height: 'auto',
    padding: 12,
    gap: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(234, 236, 240, 1)',
    width: '100%',
    marginBottom: 10, // Use marginBottom instead of margin to space elements vertically
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    opacity: 1,
    backgroundColor: 'rgba(98, 36, 143, 1)',
    // Note: React Native does not support boxShadow the same way as CSS. Use the shadow properties below.
    shadowColor: 'rgba(16, 24, 40, 1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // Android shadow
    margin: 20,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    borderWidth: 0,
  },
  btn1: {
    padding: 10,
    borderRadius: 10,
    opacity: 1,
    backgroundColor: 'rgba(98, 36, 143, 1)',
    shadowColor: 'rgba(16, 24, 40, 1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    margin: 20,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    width: 100,
    borderWidth: 0,
  },
  btn3: {
    padding: 10,
    borderRadius: 10,
    opacity: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.247)',
    shadowColor: 'rgba(16, 24, 40, 1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    margin: 20,
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    width: 'auto',
    borderWidth: 0,
  },
  upload: {
    backgroundColor: "#fff",
    height: "auto",
    padding: 10,
    margin: 15,
  },
  ups: {
    padding: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  progress: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  udn1: {
    marginTop: 20,
  },
  udn: {
    width: "80%",
    marginTop: 20,
  },
  img2: {
    height: 40,
    marginTop: 20,
    width: 40,
    borderRadius: 50,
  },
  // landing page
  top: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  top1: {
    padding: 20,paddingTop:30,
  },
  icon: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  cover: {
    backgroundColor: '#62248F',
    height: 'auto',
    marginLeft: 18,
    borderRadius: 10,
    marginRight: 18,
    marginBottom: -10,
    zIndex: 1,
  },
  cover1: {
    backgroundColor: '#580098',
    marginRight: 18,
    padding: 20,
    marginLeft: 18,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  btn2: {
    padding: 10,
    gap: 24,
    borderRadius: 10,
    opacity: 1,
    borderWidth: 0,
    backgroundColor: 'rgba(98, 36, 143, 1)',
    shadowColor: 'rgba(16, 24, 40, 1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    margin: 20,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 11.5,
    fontWeight: '400',
    lineHeight: 15.69,
    textAlign: 'center',
  },
  contain:{
flex:1,
  },
  // Navigation buttons
  nav: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: "#fff",
  },
  icon1: {
    color: 'rgba(102, 112, 133, 1)',
  },
  navs: {
    lineHeight: 12.76,
    color: 'rgba(102, 112, 133, 1)',
    fontSize: 10,
    fontWeight: '500',
  },
  insideNav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // transactions
  trx: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fund: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fund1: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  balance: {
    lineHeight: 18.56,
    fontSize: 15.34,
    color: 'white',
    fontWeight: '600',
  },
  newcover: {
    backgroundColor: '#62248F',
    padding: 25,paddingTop:35,
    paddingBottom: 50,
    zIndex: -1,
    display:'flex',flexDirection:'row'
  },
  arrow: {
    padding: 7,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.247)',
    marginTop: 20,
    marginBottom: 20,
    color: '#fff',
    borderRadius: 7,
  },
  role: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: "wrap",
    width: '100%',
  },
  roles: {
    width: "48%",
    borderWidth: 1,
    borderColor: '#62248F',
    borderRadius: 7,
    padding: 15,
    marginTop: 10,
  },
  toper: {
    padding: 20,
    borderRadius: 15,
    marginTop: -20,
    zIndex: 100000,
    backgroundColor: '#fff',
  },
  recent: {
    height: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  xkrow: {
    borderWidth: 1,
    borderColor: '#62248F',
    height: 49,
    borderRadius: 5,
    marginTop: 10,
  },
  lastDown: {
    margin: 15,
    padding: '20px 16px 16px 16px',
    gap: 24,
    borderRadius: 10,
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(16, 24, 40, 1)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    position: 'fixed',
    bottom: 15,
    left: 0,
    right: 0,
  },
  lastDown1: {
    margin: 15,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFDFFF',
    margin: 20,
    padding: 10,
    borderRadius: 15,
  },
  bgcover: {
    backgroundColor: '#00000000',
    paddingBottom: '110%',
    zIndex: 10000,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    paddingTop: '30%',
  },
  text10: {
    backgroundColor: '#EFAE1A',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    padding: 8,
    margin: 10,
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  goods: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  product: {
    backgroundColor: '#003BE3',
    padding: 20,
    margin: 20,
    borderRadius: 15,
    width: '100%',
  },
  white: {
    color: 'white',
  },
  white2: {
    textAlign: 'center',
    fontWeight: '800',
  },
  white1: {
    textAlign: 'left',
    fontWeight: '600',
    color: '#fff',
  },
  cost1: {
    borderWidth: 10,
    borderColor: '#62248F',
    borderRadius: 100,
    width: 'auto',
    height: 'auto',
    shadowColor: 'grey',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    padding: 20,
  },
  transact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 0,
    marginVertical: 0,
    width: '100%',
  },
  small: {
    fontSize: 11.5,
    fontWeight: '400',
    lineHeight: 15.69,
    textAlign: 'left',
    backgroundColor: 'rgba(102, 112, 133, 1)',
    padding: 7,
    color: '#fff',
    borderRadius: 10,
  },
  eyeIcon: {
    marginLeft: -30,
  },
  Vendors: {
    padding: 20,
  },
  float: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  floater: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 15,borderBottomWidth:1,borderBottomColor:'#ccc',padding:5
  },
  errorText: {
    color: 'red',
    margin: 10,
    fontSize: 12,
  },
  profilePicture: {
    height: 150, 
  width:'50%',
    margin:10,
  },
  businessName: {
    padding: 20,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
  follow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  followbtn: {
    padding: 8,
    borderRadius: 20,
    width: 80,
    borderWidth: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.247)',
  },
  bio: {
    backgroundColor: 'rgba(128, 128, 128, 0.247)',
    padding: 20,
    margin: 15,
    borderRadius: 15,
  },
  step1: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  step1Under: {
    height: 'auto',
    gap: 4,
    width: '100%',
    margin: 10,
    flexDirection: 'row',
  },
  update: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: 'rgba(98, 36, 143, 1)',
    color: '#fff',
  },
  text20: {
    fontSize: 11.5,
    fontWeight: '400',
    lineHeight: 15.69,
    textAlign: 'left',
    color: 'rgba(102, 112, 133, 1)',
    margin: 10,
  },
  editIcon: {
    position: 'absolute',
    right: 30,
    top: '20%',
    padding: 10,
    backgroundColor: '#62248F',
    borderRadius: 50,
  },
  allProductsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  productImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productImage: {
    width: 95,
    height: 90,
    borderRadius: 10,
  },
  bg:{
    display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#ccc'
  }
});


export default styles;
