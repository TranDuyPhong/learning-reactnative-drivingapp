import React from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import rgba from 'hex-to-rgba';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
    Block,
    Text,
    Badge,
    Card
} from '../components';
import { theme, mocks } from '../constants';
import { styles as blockStyles } from '../components/Block';
import { styles as cardStyles } from '../components/Card';

const { width } = Dimensions.get('window');

class Welcome extends React.Component {
    static navigationOptions = {
        headerTitle: <Text style={theme.fonts.header}>Welcome</Text>,
        headerRight: (
            <TouchableOpacity>
                <Block flex={false}>
                    <Image 
                        resizeMode='contain'
                        source={require('../assets/images/Icon/Menu.png')}
                        style={{
                            width: 20,
                            height: 24
                        }} 
                    />
                    <Badge
                        size={13}
                        color={theme.colors.accent}
                        style={{
                            position: 'absolute',
                            top: -4,
                            right: -4
                        }}
                    />
                </Block>
            </TouchableOpacity>
        )
    }

    renderMonthly() {
        const { navigation } = this.props;
        return (
            <TouchableOpacity 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Rewards')}
            >
                <Card shadow style={{
                    paddingVertical: theme.sizes.padding
                }}>
                    <Image
                        source={require('../assets/images/Icon/More.png')}
                        resizeMode='contain'
                        style={styles.moreIcon}
                    />
                    <Block>
                        <Block center>
                            <Text h1 primary spacing={1.7}>$11.71</Text>
                            <Text spacing={0.7}>Total Monthly Rewards</Text>
                        </Block>
                        <Block
                            color={theme.colors.gray3}
                            style={styles.hLine}
                        />
                        <Block row>
                            <Block center>
                                <Text size={20} spacing={0.6} primary style={{
                                    marginBottom: 6
                                }}>8.1</Text>
                                <Text body spacing={0.7}>Driving</Text>
                                <Text body spacing={0.7}>Score</Text>
                            </Block>
                            <Block
                                flex={false}
                                color={theme.colors.gray3}
                                style={styles.vLine}
                            />
                            <Block center>
                                <Text size={20} spacing={0.6} primary style={{
                                    marginBottom: 6
                                }}>37</Text>
                                <Text body spacing={0.7}>Driver's</Text>
                                <Text body spacing={0.7}>Level</Text>
                            </Block>
                        </Block>
                    </Block>
                </Card>
            </TouchableOpacity>
        )
    }

    renderAwards() {
        return (
            <LinearGradient
                end={{
                    x: 1,
                    y: 0
                }}
                colors={[
                    '#FF988A',
                    theme.colors.accent
                ]}
                style={[
                    blockStyles.row,
                    cardStyles.card,
                    styles.awards
                ]}
            >
                <Block middle flex={0.4}>
                    <Badge color={rgba(theme.colors.white, '0.2')} size={74}>
                        <Badge color={rgba(theme.colors.white, '0.2')} size={52}>
                            <FontAwesome name='trophy' color='white' size={62 / 2.5} />
                        </Badge>
                    </Badge>
                </Block>
                <Block middle>
                    <Text size={theme.sizes.base} spacing={0.4} medium white>Wohoo!</Text>
                    <Text size={theme.sizes.base} title spacing={0.4} medium white>Safe Driver Trophy!</Text>
                </Block>
            </LinearGradient>
        );
    }

    renderTrip(item) {
        return (
            <Card shadow key={`trip-${item.id}`}>
                <Block row space='between' style={{
                    marginBottom: theme.sizes.base
                }}>
                    <Text spacing={0.5} caption>{item.date}</Text>
                    <Text spacing={0.5} caption medium primary>{item.score}</Text>
                    <Text spacing={0.5} caption>{item.distance}</Text>
                </Block>
                <Block row center>
                    <Badge color={rgba(theme.colors.accent, '0.2')} size={14} style={{
                        marginRight: theme.sizes.base
                    }}>
                        <Badge color={theme.colors.accent} size={8} />
                    </Badge>
                    <Text spacing={0.5} color='gray'>{item.from}</Text>
                </Block>
                <Block row center style={{
                    paddingVertical: 4
                }}>
                    <Badge color='gray2' size={4} style={{
                        marginLeft: 4.5
                    }} />
                </Block>
                <Block row center>
                    <Badge color={rgba(theme.colors.accent, '0.2')} size={14} style={{
                        marginRight: theme.sizes.base
                    }}>
                        <Badge color={theme.colors.accent} size={8} />
                    </Badge>
                    <Text spacing={0.5} color='gray'>{item.to}</Text>
                </Block>
            </Card>
        );
    }

    renderTrips() {
        return (
            <React.Fragment>
                <Block style={{
                    marginBottom: theme.sizes.base
                }}>
                    <Text spacing={0.4} transform='uppercase'>Recent</Text>
                </Block>
                {mocks.trips.map(item => this.renderTrip(item))}
            </React.Fragment>
        );
    }

    renderTripButton() {
        const { navigation } = this.props;

        return (
            <Block center middle style={styles.startTrip}>
                <Badge color={rgba(theme.colors.primary, '0.1')} size={144}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Trip')}>
                        <Badge color={theme.colors.primary} size={62}>
                            <FontAwesome name='automobile' size={62 / 2} color='white' />
                        </Badge>
                    </TouchableOpacity>
                </Badge>
            </Block>
        );
    }

    render() {
        return (
            <React.Fragment>
                <ScrollView style={styles.welcome}>
                    {this.renderMonthly()}
                    {this.renderAwards()}
                    {this.renderTrips()}
                </ScrollView>
                {this.renderTripButton()}
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    welcome: {
        paddingHorizontal: theme.sizes.padding,
        paddingVertical: theme.sizes.padding,
        backgroundColor: theme.colors.gray4
    },
    hLine: {
        marginVertical: theme.sizes.base * 2,
        marginHorizontal: theme.sizes.base * 2,
        height: 1
    },
    vLine: {
        marginVertical: theme.sizes.base / 2,
        height: 1
    },
    moreIcon: {
        width: 16,
        height: 16,
        position: 'absolute',
        right: theme.sizes.base,
        top: theme.sizes.base
    },
    awards: {
        padding: theme.sizes.base,
        marginBottom: theme.sizes.padding
    },
    startTrip: {
        position: 'absolute',
        left: (width - 144) / 2,
        bottom: 0
    }
});

export default Welcome;