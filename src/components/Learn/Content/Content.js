import React, { Component } from 'react';
import styled from 'styled-components';

import RenderedContent from '../../shared/RenderedContent';
import ContentfulService from '../../../services/ContentfulService';

import Button from '../../shared/Button'
import ConceptModal from '../Concept/ConceptModal';
import UploadModal from '../Upload/UploadModal';

const ButtonSection = styled.div`
    text-align: right;
`

class Content extends Component {
    constructor(props) {
        super();
        this.state = {
            cardID: null,
            conceptID: props.conceptID,
            cardData: {}
        }
        this.switchCard = this.switchCard.bind(this);

        this.service = new ContentfulService();
    }

    componentDidUpdate(prevProps) {
        if (this.props.cardID !== prevProps.cardID) {
            this.switchCard(this.props.cardID);
            this.setState({
                conceptID: this.props.conceptID
            })
        }
    }

    switchCard(cardID) {
        this.service.getCard(cardID).then(data => {
            this.setState({
                cardData: data.content,
            })
        })
    }

    render() {
        return (
            <div>
                <RenderedContent content={this.state.cardData} />

                <ButtonSection>
                    {!this.props.firstCard ?
                        <Button buttonState="PrevCard"
                            class_name="button"
                            moveToPrev={this.props.click} />
                        : null
                    }
                    {!this.props.lastCard ?
                        <Button buttonState="NextCard" class_name="button invert" moveToNext={this.props.click} />
                        : <Button buttonState="Submit" class_name="button invert" />
                    }
                </ButtonSection>

                {this.state.conceptID ?
                    <ConceptModal conceptID={this.state.conceptID} />
                    : null
                }

                <UploadModal />
            </div>
        )
    }
}

export default Content;
