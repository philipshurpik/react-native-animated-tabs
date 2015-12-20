'use strict';

var React = require('react-native');
var { TouchableOpacity, Component, Text, StyleSheet } = React;

class AnimatedTabBarLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activatedIndex: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentIndex !== this.props.currentIndex) {
            this.setState({activatedIndex: null});
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.tabHeaderLabel} onPress={this._onPress.bind(this)} key={this.props.index}>
                <Text style={[this.getElementStyle()]}>{this.props.tabLabel}</Text>
            </TouchableOpacity>
        );
    }

    getElementStyle() {
        if (this.state.activatedIndex === this.props.index) {
            return styles.justSelected;
        }
        if (this.props.currentIndex === this.props.index) {
            return styles.selected;
        }
        return styles.notSelected;
    }

    _onPress() {
        this.setState({activatedIndex: this.props.index});
        this.props.onPress(this.props.index);
    }
}

AnimatedTabBarLabel.propTypes = {
    tabLabel: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    onPress: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    notSelected: {
        color: 'grey'
    },
    justSelected: {
        color: 'darkorange',
        opacity: 0.5
    },
    selected: {
        color: 'darkorange'
    },
    tabHeaderLabel: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
});

module.exports = AnimatedTabBarLabel;