/*
This file is part of the Juju GUI, which lets users view and manage Juju
environments within a graphical interface (https://launchpad.net/juju-gui).
Copyright (C) 2015 Canonical Ltd.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License version 3, as published by
the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranties of MERCHANTABILITY,
SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero
General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

class EntityContentDiagram extends React.Component {
  render() {
    const url = this.props.getDiagramURL(this.props.id);
    const classes = classNames(
      'entity-content__diagram',
      {'row row--grey': this.props.isRow}
    );
    return (
      <div className={classes}>
        <object type="image/svg+xml" data={url}
          className="entity-content__diagram-image" />
      </div>
    );
  }
};

EntityContentDiagram.propTypes = {
  getDiagramURL: React.PropTypes.func.isRequired,
  id: React.PropTypes.string.isRequired,
  isRow: React.PropTypes.bool
};

YUI.add('entity-content-diagram', function() {
  juju.components.EntityContentDiagram = EntityContentDiagram;
}, '0.1.0', {
  requires: []
});
