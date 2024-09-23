import "@testing-library/jest-dom";

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import FileList from "@/app/components/FileList";

describe("FileList", () => {
    it("should render file list with given files", () => {
        const mockFiles = [
            { title: 'File 1', mimeType: "text/plain" },
            { title: 'File 2', mimeType: "text/plain" },
            { title: 'File 3', mimeType: "text/plain" },
        ];

        render(<FileList loadedFiles={mockFiles} />);

        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem').length).toBe(mockFiles.length);
        expect(screen.getByText('File 1')).toBeInTheDocument();
        expect(screen.getByText('File 2')).toBeInTheDocument();
        expect(screen.getByText('File 3')).toBeInTheDocument();
    });
});