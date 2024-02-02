'use client';

import React from 'react';
import DataTable from '@/app/lib/components/DataTable';
import Settings from '@/app/lib/components/Settings';
import VisPreview from '@/app/lib/components/VisPreview';
import BarChart from '@/app/lib/components/BarChart';
import { useEditorContext } from '@/app/lib/EditorContext';

export default function Page() {
    const { dataset } = useEditorContext();
    const hasData = dataset.columns().length > 0;

    return (
        <>
            <DataTable />
            <div className="columns mt-5" style={{ minHeight: '600px' }}>
                <div className="column" style={{ minWidth: '358px', maxWidth: '358px' }}>
                    {hasData && <Settings />}
                </div>
                <div className="column">
                    <VisPreview>
                        <div
                            className="chart is-size-5 is-flex-direction-column is-flex is-justify-content-center is-align-items-center"
                            style={{ height: '100%' }}
                        >
                            <BarChart />
                        </div>
                    </VisPreview>
                </div>
            </div>
        </>
    );
}
