import React from 'react';

import Menu from '../shared/Menu';
import Icon from '../shared/Icon';

class SettingsMenu extends React.Component {
  static propTypes = {
    organization: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      members: React.PropTypes.shape({
        count: React.PropTypes.number.isRequired
      }),
      invitations: React.PropTypes.shape({
        count: React.PropTypes.number.isRequired
      }),
      permissions: React.PropTypes.shape({
        organizationUpdate: React.PropTypes.shape({
          allowed: React.PropTypes.bool.isRequired
        }),
        organizationMemberCreate: React.PropTypes.shape({
          allowed: React.PropTypes.bool.isRequired
        }),
        notificationServiceUpdate: React.PropTypes.shape({
          allowed: React.PropTypes.bool.isRequired
        }),
        organizationBillingUpdate: React.PropTypes.shape({
          allowed: React.PropTypes.bool.isRequired
        })
      })
    })
  };

  render() {
    let items = [
      <Menu.Header key="header">{this.props.organization.name}</Menu.Header>
    ];

    if(this.props.organization.permissions.organizationUpdate.allowed) {
      items.push(
        <Menu.Button key="settings" href={`/organizations/${this.props.organization.slug}/settings`}>
          <Icon icon="settings" className="icon-mr"/>Settings
        </Menu.Button>
      );
    }

    if(this.props.organization.permissions.organizationMemberCreate.allowed) {
      let membersCount = this.props.organization.members.count + this.props.organization.invitations.count;

      items.push(
        <Menu.Button key="users" href={`/organizations/${this.props.organization.slug}/users`} badge={membersCount}>
          <Icon icon="users"className="icon-mr"/>Users
        </Menu.Button>
      );
    }

    if(this.props.organization.permissions.notificationServiceUpdate.allowed) {
      items.push(
        <Menu.Button key="notification-services" href={`/organizations/${this.props.organization.slug}/services`}>
          <Icon icon="notification-services" className="icon-mr"/>Notification Services
        </Menu.Button>
      );
    }

    if(this.props.organization.permissions.organizationBillingUpdate.allowed) {
      items.push(
        <Menu.Button key="billing" href={`/organizations/${this.props.organization.slug}/billing`}>
          <Icon icon="billing" className="icon-mr"/>Billing
        </Menu.Button>
      );
    }

    return (
      <div>
        <Menu>
          {items}
        </Menu>

        <Menu>
          <Menu.Button href={`/user/settings`}>Personal Settings</Menu.Button>
        </Menu>
      </div>
    );
  }
}

export default SettingsMenu;
