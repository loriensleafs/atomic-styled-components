import React, {useCallback, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import getScrollbarSize from 'dom-helpers/util/scrollbarSize'
import Popover from '../Popover'
import MenuList from '../MenuList'
import useStyles from '../system/useStyles'

const RTL_ORIGIN = {
	vertical: 'top',
	horizontal: 'right',
};

const LTR_ORIGIN = {
	vertical: 'top',
	horizontal: 'left',
};

const baseStyles = {
	maxHeight: 'calc(100% - 96px)',
	// Add iOS momentum scrolling.
	WebkitOverflowScrolling: 'touch',
}

function Menu(props) {
	const menuListRef = useRef(null)
	const anchorAttachRef = useRef(null)

	const handleListKeyDown = useCallback(event => {
		if (event.key === 'Tab') {
			event.preventDefault();
		}
	}, [])
}