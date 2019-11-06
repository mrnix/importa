import * as React from 'react';
import cx from 'classnames';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';

import {DragSource, DropTarget} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';
// @ts-ignore
import Image from 'react-image';

import {
  ItemDragSpec,
  ItemDropSpec,
  dragCollect,
  dropCollect
} from '../../Item/Item';

import styles from './Item.module.sass';
import {RootState} from '../../../common/store';
// import Button from '../../Button/Button';
import {navigate} from '@reach/router';

const FolderThumb = ({item}: any) => {
  return (
    <div className={styles.folderThumb}>
      {item.children.slice(0, 4).map((p: string) => (
        <Thumb key={p} p={p} />
      ))}
    </div>
  );
};

const Thumb = connect((state: RootState, {p}: any) => ({
  thumb: state.data.thumbs[p]
}))(({thumb, p}: any) => {
  if (!thumb) {
    return null;
  }
  // console.log(p);

  return (
    <span className={styles.thumb}>
      <VisibilitySensor>
        <Image className={styles.image} src={thumb.src} alt="" />
      </VisibilitySensor>
    </span>
  );
});

class Item extends React.Component<any> {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  renderDropTarget(children: any) {
    const {connectDropTarget, connectDragSource} = this.props;
    // const isFolder = R.path(['item', 'isFolder'], this.props);

    return this.props.item.isFolder
      ? connectDropTarget(connectDragSource(children, {dropEffect: 'no'}))
      : connectDragSource(children, {dropEffect: 'no'});
  }

  handleDoubleClick = () => {
    const {item} = this.props;
    if (item.isFolder) {
      navigate(`/folder${item.fullPath}`);
    }
  };

  render() {
    const {selected, isDragging, isOver, canDrop, style, item} = this.props;

    return this.renderDropTarget(
      <div
        style={style}
        className={cx(styles.item, {
          [styles.dragging]: isDragging,
          [styles.isOver]: isOver,
          [styles.canDrop]: canDrop,
          [styles.selected]: selected
        })}
      >
        <div className={styles.preview} onDoubleClick={this.handleDoubleClick}>
          {item && item.isFolder && <FolderThumb item={item} />}
          {item && !item.isFolder && <Thumb p={this.props.p} />}
          {/* <div className={styles.actions}>
            <Button icon={'☆'} />
          </div> */}
        </div>
      </div>
    );
  }
}

export default compose<any, any>(
  connect((state: RootState, props: any) => ({
    item: state.data.items[props.p]
  })),
  DragSource('item', ItemDragSpec, dragCollect),
  DropTarget('item', ItemDropSpec, dropCollect)
)(Item);
