import React from 'react'
import { nanoid } from 'nanoid'
import { Image, Flex } from '@chakra-ui/react'
import Masonry from 'react-masonry-css'

const Images = ({ images }) => {
	const breakpointColumnsObj = {
		default: 3,
		1500: 3,
		800: 1,
	}

	const columnClassName = 'my-masonry-grid_column'

	const gutterSpace = '30px'

	const masonryStyles = {
		ml: `-${gutterSpace}`,
	}

	const selector = `& .${columnClassName}`

	masonryStyles[selector] = {
		pl: gutterSpace,
		backgroundClip: 'padding-box',
	}

	return (
		<Flex
			columnClassName={columnClassName}
			as={Masonry}
			breakpointCols={breakpointColumnsObj}
			sx={masonryStyles}
			mt='2rem'
		>
			{images.map((image) => (
				<Image w='100%' key={nanoid()} mb={gutterSpace} src={image} alt='' />
			))}
		</Flex>
	)
}

export default Images