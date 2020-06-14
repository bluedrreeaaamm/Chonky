import React, { useContext, useRef } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';

import { ChonkyFilesContext } from '../../util/context';
import { Logger } from '../../util/logger';
import { isMobileDevice } from '../../util/validation';
import { ErrorMessage } from '../internal/ErrorMessage';
import { FileEntry } from '../internal/FileEntry';
import { FileBrowser } from './FileBrowser';
import {
    SmallThumbsSize,
    getColWidth,
    getRowHeight,
    noContentRenderer,
    useEntryRenderer,
} from './FileList-virtualization';

export interface FileListProps {}

export const FileList: React.FC<FileListProps> = () => {
    const files = useContext(ChonkyFilesContext);
    const entryRenderer = useEntryRenderer(files);
    const thumbsGridRef = useRef<Grid>();

    // TODO: Read this value from somewhere.
    const fillParentContainer = true;

    if (!files) {
        const errorMessage =
            `${FileList.name} cannot find the "files" array via React context. This ` +
            `happens when ${FileList.name} is placed outside of ${FileBrowser.name}` +
            `component.`;
        Logger.error(errorMessage);
        return <ErrorMessage message={errorMessage} />;
    }

    const components: React.ReactElement[] = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const key = file ? file.id : `file-entry-${i}`;
        components.push(<FileEntry key={key} file={file} />);
    }

    return (
        <div className="chonky-file-list">
            <AutoSizer disableHeight={!fillParentContainer}>
                {({ width, height }) => {
                    let columnCount: number;
                    let entrySize = SmallThumbsSize;

                    const isMobile = isMobileDevice();
                    const gutter = isMobile ? 5 : 10;
                    const scrollbar = !fillParentContainer || isMobile ? 0 : 16;

                    // TODO: const isLargeThumbs = view === FileView.LargeThumbs;
                    const isLargeThumbs = false;
                    if (isMobile && width < 400) {
                        // Hardcode column count on mobile
                        columnCount = isLargeThumbs ? 2 : 3;
                        entrySize = {
                            width: Math.floor(
                                (width - gutter * (columnCount - 1)) / columnCount
                            ),
                            height: isLargeThumbs ? 160 : 120,
                        };
                    } else {
                        const columnCountFloat =
                            (width + gutter - scrollbar) / (entrySize.width + gutter);
                        columnCount = Math.max(1, Math.floor(columnCountFloat));
                    }
                    const rowCount = Math.ceil(files.length / columnCount);

                    return (
                        <Grid
                            style={{ minHeight: entrySize.height + 10 }}
                            ref={thumbsGridRef as any}
                            cellRenderer={(data) => {
                                const index =
                                    data.rowIndex * columnCount + data.columnIndex;
                                return entryRenderer(
                                    data.key,
                                    index,
                                    { ...data.style },
                                    data.parent,
                                    gutter,
                                    data.rowIndex === rowCount - 1,
                                    data.columnIndex === columnCount - 1
                                );
                            }}
                            noContentRenderer={() =>
                                noContentRenderer(entrySize.height)
                            }
                            rowCount={rowCount}
                            columnCount={columnCount}
                            columnWidth={({ index }) =>
                                getColWidth(index, columnCount, entrySize, gutter)
                            }
                            rowHeight={({ index }) =>
                                getRowHeight(index, rowCount, entrySize, gutter)
                            }
                            width={width}
                            height={typeof height === 'number' ? height : 500}
                            autoHeight={!fillParentContainer}
                            tabIndex={null}
                        />
                    );

                    return components;
                }}
            </AutoSizer>
        </div>
    );
};