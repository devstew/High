import React, { Component } from "react";
import {
  Container,
  Name,
  GameListHeader,
  GameList,
  GameRecord,
  Column,
  ColumnLabels
} from "../styled/Profile";

class Profile extends Component {
  static defaulProps = {
    user: {
      email: "USER_EMAIL",
      games: [
        {
          winner: true,
          createdAt: "12/25/2018",
          id: "1001"
        },
        {
          winner: true,
          createdAt: "12/24/2018",
          id: "0001"
        },
        {
          winner: true,
          createdAt: "12/26/2018",
          id: "1011"
        }
      ]
    }
  };

  get records() {
    return this.props.user.games.map((game, index) => {
      return (
        <GameRecord
         key={index}
         index={index}
        >
        <Column>
          {(game.winner ) ? 'Won!' : 'Didn\'t win'}
         </Column>
        <Column> 
          "ROBOT"
        </Column>
          "No"
        <Column>
          {game.createdAt}
         </Column>

        <Column>
        
         </Column>
        </GameRecord>
      )
    });
  }

  render() {
    let { email } = this.props.user;
    return (
      <Container>
        <Name>{email}</Name>
        <GameList>
          <GameListHeader>My games</GameListHeader>
          <ColumnLabels>
            <Column>Outcome</Column>
            <Column>Guess</Column>
            <Column>Guessed Correctly</Column>
            <Column>Date</Column>
          </ColumnLabels>
          {this.records}
        </GameList>
        <GameRecord />
      </Container>
    );
  }
}

export default Profile;
