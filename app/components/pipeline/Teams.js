import React from 'react';

import Chooser from '../shared/Chooser';
import Emojify from '../shared/Emojify';

class PipelineTeams extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object.isRequired,
    selected: React.PropTypes.array.isRequired,
    onTeamSelect: React.PropTypes.func.isRequired,
    onTeamDeselect: React.PropTypes.func.isRequired
  };

  state = {
    selected: this.props.selected
  };

  render() {
    return (
      <Chooser selected={this.state.selected} multiple={true} onSelect={this.handleTeamSelect}>
        {
          this.props.organization.teams.edges.map((edge) => {
            return (
              <Chooser.Option
                tag="button"
                key={edge.node.id}
                value={edge.node.id}
                data={{ team: edge.node }}
                className="btn border border-gray rounded mr2 regular user-select-none"
                selectedClassName="border-lime"
              >
                <Emojify text={edge.node.name} />
              </Chooser.Option>
            );
          })
        }
      </Chooser>
    );
  }

  handleTeamSelect = (id, data) => {
    const selected = this.state.selected;

    // Toggle its selected state and fire callbacks
    const index = this.state.selected.indexOf(id);
    if (index !== -1) {
      selected.splice(index, 1);
      this.props.onTeamDeselect(data.team);
    } else {
      selected.push(id);
      this.props.onTeamSelect(data.team);
    }

    this.setState({ selected: selected });
  };
}

export default PipelineTeams;
