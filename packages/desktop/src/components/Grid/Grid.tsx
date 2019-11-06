import * as React from 'react';
import {fromPairs, range} from 'lodash';
import {connect} from 'react-redux';
import {
  Grid as ReactVirtualizedGrid,
  AutoSizer,
  ArrowKeyStepper
} from 'react-virtualized';
import 'react-virtualized/styles.css'; // tslint:disable-line no-submodule-imports

import Item from './Item/Item';
import styles from './Grid.module.sass';

const MIN_SIZE = 200;
const SPACER = 20;

class Grid extends React.Component<any> {
  state = {index: -1, items: []};
  metaIndex?: number;
  shiftIndex?: number;
  columnCount: number = 5;

  rangeItems = (from: number, to: number): any =>
    fromPairs([...range(from, to), to].map(i => [this.state.items[i], true]));

  rowGetter = ({index}: any) => this.props.items[index];

  handleScrollChange = ({scrollToRow: index}: any) => {
    let items;
    const event: any = window.event;
    if (event.shiftKey) {
      if (typeof this.shiftIndex !== 'number') {
        this.shiftIndex = this.state.index;
      }
      const prev =
        typeof this.metaIndex === 'number' ? this.props.selected : [];
      items = [...prev, ...this.rangeItems(this.shiftIndex, index)];
    } else {
      this.shiftIndex = index;
      const item = this.rowGetter({index});
      items = [item.id];
    }
    this.setState({index});
    this.props.select(items);
  };

  handleClick = (item: any, event: any) => {
    event.stopPropagation();
    // const items = [item.id];
    // this.props.select(items);
  };

  handleDoubleClick = (item: any, event: any) => {
    event.stopPropagation();
    this.props.onDoubleClick(item);
  };

  handleClickOutside = () => {
    // this.props.deselect();
  };

  cellRenderer = ({columnIndex, rowIndex, key, style}: any) => {
    const index = this.columnCount * rowIndex + columnIndex;
    const p = this.rowGetter({index});

    if (!p) {
      return null;
    }

    return (
      <Item
        key={key}
        dispatch={this.props.dispatch}
        p={p}
        selected={this.props.selected}
        // onClick={(e: any) => this.handleClick(item, e)}
        // onDoubleClick={(e: any) => this.handleDoubleClick(item, e)}
        style={style}
      />
    );
  };

  render() {
    const cellCount = this.props.items.length;

    return (
      <div className={styles.grid} onClick={this.handleClickOutside}>
        <AutoSizer>
          {({height, width}) => {
            this.columnCount = Math.floor(
              (width + SPACER) / (MIN_SIZE + SPACER)
            );
            const SIZE = Math.floor((width - SPACER * 2) / this.columnCount);

            if (!width) {
              return null;
            }

            if (this.columnCount < 1) {
              return null;
            }

            const rowCount = Math.ceil(cellCount / this.columnCount);

            return (
              <ArrowKeyStepper
                mode="cells"
                columnCount={this.columnCount}
                rowCount={rowCount}
                scrollToRow={this.state.index}
                onScrollToChange={this.handleScrollChange}
                isControlled
              >
                {({onSectionRendered}) => (
                  <ReactVirtualizedGrid
                    style={{padding: `0 ${SPACER}px 40px`}}
                    width={width}
                    height={height}
                    cellRenderer={this.cellRenderer}
                    columnCount={this.columnCount}
                    columnWidth={SIZE}
                    rowHeight={SIZE}
                    rowCount={rowCount}
                    overscanRowCount={10}
                    onCellsRendered={({startIndex, stopIndex}: any) => {
                      onSectionRendered({
                        rowStartIndex: startIndex,
                        rowStopIndex: stopIndex
                      } as any);
                    }}
                  />
                )}
              </ArrowKeyStepper>
            );
          }}
        </AutoSizer>
      </div>
    );
  }
}

export default connect(
  null,
  {
    // select: items.select,
    // deselect: items.deselect,
  }
)(Grid);
