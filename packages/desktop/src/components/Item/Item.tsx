import * as React from 'react';
import {connect} from 'react-redux';
import {DragLayer, DragSourceConnector, DragSourceMonitor} from 'react-dnd';
import cx from 'classnames';

import styles from './Item.module.sass';
import {RootState} from '../../common/store';

const TRASH_ID = '/trash';

export const ItemDragSpec: any = {
  beginDrag: (o: any) => {
    return {
      item: o.item
    };
  },
  canDrag: (props: any) => {
    return props.item.id !== TRASH_ID;
  },
  isDragging: (props: any, monitor: any) => false
};

export const ItemDropSpec: any = {
  drop: (props: any, monitor: any) => {},
  canDrop: (props: any, monitor: any) => {
    return true;
  }
};

export const dragCollect = (
  c: DragSourceConnector,
  monitor: DragSourceMonitor
) => {
  return {
    connectDragPreview: c.dragPreview(),
    connectDragSource: c.dragSource(),
    isDragging: monitor.isDragging()
  };
};

export const dropCollect = (c: any, monitor: any) => {
  return {
    connectDropTarget: c.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop()
  };
};

export const Name = (props: any) => {
  return <span className={styles.name}>{props.item && props.item.name}</span>;
};

export const Icon = (props: any) => {
  const {item} = props;

  return item.isFolder ? (
    'FOLDER'
  ) : (
    <div className={styles.thumbnailWrap}>thumb</div>
  );
};

class CustomDragLayer extends React.Component<any> {
  getStyles = (o: any) => {
    if (!o.clientOffset) {
      return {display: 'none'};
    }

    return {
      top: o.clientOffset.y + 4,
      left: o.clientOffset.x + 4
    };
  };
  render() {
    const {isDragging, itemType, files, item} = this.props;

    if (!isDragging || itemType !== 'item') {
      return null;
    }

    return (
      <div className={cx(styles.dragLayer)} style={this.getStyles(this.props)}>
        {files.length === 1 && (
          <span>
            <span className={styles.dragItemName}>{item.name}</span>
          </span>
        )}
        {files.length > 1 && (
          <div className={styles.dragMultiple}>
            {files.map((file: any) => (
              <div key={file.id}>
                <span className={styles.dragItemName}>{file.name}</span>
              </div>
            ))}
            <span className={styles.dragCount}>{files.length}</span>
          </div>
        )}
      </div>
    );
  }
}

function collect(monitor: any) {
  return {
    ...monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
    clientOffset: monitor.getClientOffset()
  };
}

const mapStateToProps = (state: RootState, props: any) => ({});

export const CustomDragPreview = DragLayer(collect)(
  connect(mapStateToProps)(CustomDragLayer)
);
