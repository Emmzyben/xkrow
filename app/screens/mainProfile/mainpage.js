import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight, faPen } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../backend/user';
import useGetInfo2 from '../../hooks/useGetinfo2';
import useDeleteAccount from '../../hooks/useDeleteAccount';
import styles from '../../styles/style';
const Mainpage = ({ navigation }) => {
    const { user, logout } = useUser();
    const [loading, setLoading] = useState(false);
    const { deleteAccount } = useDeleteAccount();
    const { info, loading: infoLoading, error: infoError } = useGetInfo2();

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            Alert.alert('Logout Successful', 'You have been logged out.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Logout Failed', error.message || 'Failed to log out.');
        } finally {
            setLoading(false);
        }
    };

    // const handleDeleteAccount = () => {
    //     Alert.alert(
    //         'Confirm Deletion',
    //         'Are you sure you want to delete your account? There will be no going back.',
    //         [
    //             {
    //                 text: 'Cancel',
    //                 style: 'cancel'
    //             },
    //             {
    //                 text: 'Delete',
    //                 onPress: async () => {
    //                     setLoading(true);
    //                     if (!user) {
    //                         Alert.alert('Error', 'No user is currently logged in.');
    //                         setLoading(false);
    //                         return;
    //                     }

    //                     try {
    //                         await deleteAccount(user.id);
    //                         await logout(); // Ensure the user is logged out after deletion
    //                         Alert.alert('Account Deleted', 'Your account has been deleted.');
    //                         navigation.navigate('Login');
    //                     } catch (error) {
    //                         Alert.alert('Deletion Failed', error.message || 'Failed to delete account.');
    //                     } finally {
    //                         setLoading(false);
    //                     }
    //                 },
    //                 style: 'destructive'
    //             }
    //         ],
    //         { cancelable: false }
    //     );
    // };

    return (
        <ScrollView style={{ display: 'flex' }}>
            <View style={localStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.backButton}>
                    <FontAwesomeIcon icon={faArrowLeft} size={17} />
                </TouchableOpacity>
                <Text style={localStyles.headerTitle}>Profile</Text>
            </View>

            <View style={localStyles.container}>
                <View style={localStyles.under}>
                    {infoLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : infoError ? (
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Error fetching profile info</Text>
                    ) : (
                        <>
                            <View>
                                <Image
                                    style={localStyles.imgProfile}
                                    source={info.image_url ? { uri: info.image_url } : require('../../../assets/Featured.png')}
                                />
                            </View>
                            <View>
                                <Text style={{ color: '#fff', textAlign: 'center' }}>
                                    {info.firstName} {info.lastName}
                                </Text>
                            </View>
                            <View style={{ marginLeft: 150 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Biopage')}>
                                    <FontAwesomeIcon icon={faPen} size={18} color='#fff' />
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>

            <View style={styles.maincontainer}>
                <View style={styles.steps}>
                    <TouchableOpacity style={styles.stepsUnder} onPress={() => navigation.navigate('Profile')}>
                        <View>
                            <Image style={styles.img1} source={require('../../../assets/pic.png')} />
                        </View>
                        <View>
                            <Text style={localStyles.text}>Vendors account</Text>
                            <Text style={styles.text3}>Create or edit your vendor account</Text>
                        </View>
                        <View style={{ marginLeft: 60 }}>
                            <FontAwesomeIcon icon={faArrowRight} size={19} color='#ccc' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.stepsUnder} onPress={() => navigation.navigate('ProfProfile1')}>
                        <View>
                            <Image style={styles.img1} source={require('../../../assets/pic.png')} />
                        </View>
                        <View>
                            <Text style={localStyles.text}>Professional account</Text>
                            <Text style={styles.text3}>Create or edit account</Text>
                        </View>
                        <View style={{ marginLeft: 135 }}>
                            <FontAwesomeIcon icon={faArrowRight} size={19} color='#ccc' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.stepsUnder} onPress={() => navigation.navigate('PasswordReset')}>
                        <View>
                            <Image style={styles.img1} source={require('../../../assets/pic1.png')} />
                        </View>
                        <View>
                            <Text style={localStyles.text}>Change Password</Text>
                            <Text style={styles.text3}>Further secure your account</Text>
                        </View>
                        <View style={{ marginLeft: 100 }}>
                            <FontAwesomeIcon icon={faArrowRight} size={19} color='#ccc' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.stepsUnder}
                        disabled={loading}
                        onPress={handleLogout}
                    >
                        <View>
                            <Image style={styles.img1} source={require('../../../assets/pic2.png')} />
                        </View>
                        <View>
                            {loading ? (
                                <ActivityIndicator size="small" color="#62248F" />
                            ) : (
                                <Text style={localStyles.text}>Log out</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={localStyles.footerText}>More</Text>

            <View style={styles.maincontainer}>
                <TouchableOpacity style={styles.stepsUnder} onPress={() => navigation.navigate('Support')}>
                    <View>
                        <Image style={styles.img1} source={require('../../../assets/pic3.png')} />
                    </View>
                    <View>
                        <Text style={localStyles.text}>Help & Support</Text>
                    </View>
                    <View style={{ marginLeft: 180 }}>
                        <FontAwesomeIcon icon={faArrowRight} size={19} color='#ccc' />
                    </View>
                </TouchableOpacity>
            </View>

            {/* <View style={styles.lastDown}>
                <TouchableOpacity style={localStyles.delete} onPress={handleDeleteAccount} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Delete Account</Text>
                    )}
                </TouchableOpacity>
            </View> */}

        </ScrollView>
    );
};

const localStyles = StyleSheet.create({
    footerText: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 20,
        textAlign: 'left',
        color: '#00000',
        marginVertical: 10,
        marginLeft: 20
    },
    stepDetails: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    header: {
        padding: 20,
        paddingTop: 55
    },
    backButton: {
        position: 'absolute',
        top: 55,
        left: 25,
        zIndex: 10000
    },
    headerTitle: {
        textAlign: 'center',
        fontSize: 15.3,
        lineHeight: 18.52,
        fontWeight: '700',
        color: '#141414',
    },
    container: {
        margin: 15,
        padding: 7,
        backgroundColor: '#62248F',
        borderRadius: 10
    },
    imgProfile: {
        height: 60,
        width: 70,
        borderRadius: 100,
        marginRight: 10,
    },
    under: {
        height: 'auto',
        padding: 12,
        gap: 4,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
        textAlign: 'left',
        color: '#000000',
    },
    delete: {
        padding: 10,
        borderRadius: 10,
        opacity: 1,
        backgroundColor: '#C00000',
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
    }
});

export default Mainpage;
