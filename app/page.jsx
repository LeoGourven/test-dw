'use client';

import React from 'react';
import DataTable from '@/app/lib/components/DataTable';
import Settings from '@/app/lib/components/Settings';
import VisPreview from '@/app/lib/components/VisPreview';
import { useEditorContext } from '@/app/lib/EditorContext';

export default function Page() {
    const { dataset } = useEditorContext();

    return (
        <>
            <DataTable />
            <div className="columns mt-5" style={{ minHeight: '600px' }}>
                <div className="column" style={{ minWidth: '358px', maxWidth: '358px' }}>
                    <Settings />
                </div>
                <div className="column">
                    <VisPreview>
                        <div
                            className="chart is-size-5 is-flex-direction-column is-flex is-justify-content-center is-align-items-center"
                            style={{ height: '100%' }}
                        >
                            <div>No chart here 😢</div>
                            <div className="has-text-grey is-size-6">
                                {dataset.columns().length
                                    ? `But there is a dataset with ${
                                          dataset.columns().length
                                      } columns and ${dataset.list().length} rows!`
                                    : null}
                            </div>
                        </div>
                    </VisPreview>
                </div>
            </div>
        </>
    );
}
