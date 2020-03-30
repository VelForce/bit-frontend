import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import PickCard from '../../PickCard'
import ActivityCard from './ActivityCard'
import QuickAction from '../../../../shared/containers/QuickAction'
import Button from '../../../../shared/gadgets/Button'

import { joinClassroom } from '../../../../../services/StudentService'

const Container = styled.div`
	padding-bottom: 6em;
	flex: 6;
	display: flex;
	flex-flow: row wrap;
	align-items: start;
	font-size: 90%;
	position: relative;
`

const ColOne = styled.div`
	flex: 1;
`

const ColTwo = styled.div`
	flex: 1;
	position: relative;
	top: 5em;
`

const Journey = ({ inprogressModules }) => {
	const colOne =
		inprogressModules &&
		inprogressModules
			.filter((_, index) => index % 2 === 0)
			.map((mod, index) => {
				return (
					<ActivityCard
						key={`module-activity-${mod.id}`}
						id={mod.id}
						name={mod.name}
						// isLeft
						// isLast={inprogressModules.length === index}
					/>
				)
			})

	const colTwo =
		inprogressModules &&
		inprogressModules
			.filter((_, index) => index % 2 === 1)
			.map((mod, index) => {
				return (
					<ActivityCard
						key={`module-activity-${mod.id}`}
						id={mod.id}
						name={mod.name}
						// isLeft
						// isLast={inprogressModules.length === index}
					/>
				)
			})

	const [classCode, setClassCode] = useState()

	const action = () =>
		joinClassroom(classCode).then(res => {
			const success = !res.message.includes('Error')
			if (success) {
				window.location.replace('/')
			}
		})

	return (
		<Container>
			<QuickAction
				action={action}
				title={'Join Classroom'}
				field={
					<div style={{ marginBottom: '1em' }}>
						<TextField
							variant="outlined"
							type="text"
							label="Class Code"
							onChange={e => {
								setClassCode(e.target.value)
							}}
						/>
					</div>
				}
				buttonText="Join"
			>
				<Button>Join Classroom</Button>
			</QuickAction>

			<ColOne>
				{/* <PickCard /> */}
				{colOne}
			</ColOne>
			<ColTwo>{colTwo}</ColTwo>
		</Container>
	)
}

const mapStateToProps = state => {
	const {
		studentData: { inprogressModules }
	} = state

	return { inprogressModules }
}

export default connect(mapStateToProps)(Journey)
