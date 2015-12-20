'use strict';

var panels;
var carousel;
var indexes = {
    previous: null,
    current: null,
    next: null
};

class AnimatedTabsService {

    static init(_panels, props) {
        panels = _panels;
        carousel = props.carousel;
        indexes.current = props.selectedIndex;

        validate(_panels, props);
        calculateSideIndexes(indexes.current);
        return indexes;
    }

    static moveNext() {
        indexes.current = indexes.next;
        calculateSideIndexes(indexes.current);
        return indexes;
    }

    static movePrevious() {
        indexes.current = indexes.previous;
        calculateSideIndexes(indexes.current);
        return indexes;
    }

    static forceMoveToIndex(index) {
        if (index > indexes.current) {
            indexes.next = index
        }
        else {
            indexes.previous = index;
        }
        return indexes;
    }

    static canMove(isLeftDirection) {
        if (!carousel) {
            if ((isLeftDirection && indexes.previous === null) || (!isLeftDirection && indexes.next === null)) {
                return false;
            }
        }
        return true;
    }
}

function calculateSideIndexes(current) {
    if (carousel) {
        indexes.previous = current > 0 ? current - 1 : panels.length - 1;
        indexes.next =   current < panels.length - 1 ? current + 1 : 0;
    }
    else {
        indexes.previous = current > 0 ? current - 1 : null;
        indexes.next =  current < panels.length - 1 ? current + 1 : null;
    }
}

function validate(_panels, props) {
    if (props.tabLabels && props.tabLabels.length) {
        if (props.tabLabels.length !== _panels.length) {
            throw new Error('tabLabels should be set for each tab');
        }
    }
}

module.exports = AnimatedTabsService;
