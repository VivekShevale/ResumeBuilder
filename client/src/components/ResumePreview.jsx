import React, { useEffect, useRef } from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import HarvardTemplate from './templates/HarvardTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import InfographicTemplate from './templates/InfographicTemplate';
import TimelineTemplate from './templates/TimelineTemplate';

// Print dimensions at 96dpi
const PRINT_W_PX = 816;  // 8.5in * 96
const PRINT_H_PX = 1056; // 11in  * 96

function ResumePreview({ data, template, accentColor, fontSize = 100, classes = "" }) {
    const fontSizeRef = useRef(fontSize);

    // Keep ref in sync so beforeprint always has latest value
    useEffect(() => {
        fontSizeRef.current = fontSize;
    }, [fontSize]);

    useEffect(() => {
        const handleBeforePrint = () => {
            const el = document.getElementById('resume-preview');
            if (!el) return;

            // The element currently has zoom = fontSize%.
            // scrollHeight / scrollWidth are reported in CSS pixels BEFORE zoom.
            // Multiply by (fontSize/100) to get the rendered (zoomed) size on screen.
            const zoomFactor = fontSizeRef.current / 100;
            const renderedH = el.scrollHeight * zoomFactor;
            const renderedW = el.scrollWidth  * zoomFactor;

            // Scale so that the zoomed content fills the print page exactly
            const scaleH = PRINT_H_PX / renderedH;
            const scaleW = PRINT_W_PX / renderedW;
            const scale  = Math.min(scaleH, scaleW); // fit within page; use Math.max to fill/stretch

            el.style.setProperty('--print-scale', scale.toFixed(6));
            el.style.setProperty('--print-fs',    `${fontSizeRef.current}`);
        };

        const handleAfterPrint = () => {
            const el = document.getElementById('resume-preview');
            if (!el) return;
            el.style.removeProperty('--print-scale');
            el.style.removeProperty('--print-fs');
            // DO NOT touch el.style.zoom — React controls that via the style prop
        };

        window.addEventListener('beforeprint', handleBeforePrint);
        window.addEventListener('afterprint',  handleAfterPrint);
        return () => {
            window.removeEventListener('beforeprint', handleBeforePrint);
            window.removeEventListener('afterprint',  handleAfterPrint);
        };
    }, []); // register once; fontSizeRef gives latest value at call time

    const renderTemplate = () => {
        switch (template) {
            case "modern":        return <ModernTemplate       data={data} accentColor={accentColor} />;
            case "minimal":       return <MinimalTemplate      data={data} accentColor={accentColor} />;
            case "minimal-image": return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            case "executive":     return <ExecutiveTemplate    data={data} accentColor={accentColor} />;
            case "harvard":       return <HarvardTemplate      data={data} accentColor={accentColor} />;
            case "creative":      return <CreativeTemplate     data={data} accentColor={accentColor} />;
            case "infographic":   return <InfographicTemplate  data={data} accentColor={accentColor} />;
            case "timeline":      return <TimelineTemplate     data={data} accentColor={accentColor} />;
            default:              return <ClassicTemplate      data={data} accentColor={accentColor} />;
        }
    };

    return (
        <div className="w-full bg-gray-100">
            {/*
              zoom scales the ENTIRE subtree (rem, px, images, borders).
              React owns this value — we never touch it in event handlers.
            */}
            <div
                id="resume-preview"
                className={"border border-gray-200 print:shadow-none print:border-none " + classes}
                style={{ zoom: `${fontSize}%` }}
            >
                {renderTemplate()}
            </div>

            <style>{`
                @page {
                    size: 8.5in 11in;
                    margin: 0;
                }

                @media print {
                    html, body {
                        width: 8.5in !important;
                        height: 11in !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: hidden !important;
                    }

                    /* Hide everything except the resume */
                    body > * { visibility: hidden !important; }
                    #resume-preview,
                    #resume-preview * { visibility: visible !important; }

                    /*
                      The wrapper: full page, zoom reset so our scale math is clean.
                      zoom:1 here means the CSS transform below works in raw px.
                    */
                    #resume-preview {
                        position: fixed !important;
                        inset: 0 !important;
                        width: 8.5in !important;
                        height: 11in !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        zoom: 1 !important;          /* override React inline zoom */
                        box-shadow: none !important;
                        border: none !important;
                        overflow: hidden !important;
                        display: block !important;
                    }

                    /*
                      The template itself: scale so it fills 8.5x11 exactly.
                      --print-scale is calculated in beforeprint accounting for fontSize zoom.
                      Width/height are set to the UN-scaled dimensions so after transform
                      the result is exactly 8.5in x 11in.
                    */
                    #resume-preview > * {
                        display: block !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        transform-origin: top left !important;
                        transform: scale(var(--print-scale, 1)) !important;
                        width:  calc(8.5in / var(--print-scale, 1)) !important;
                        height: calc(11in  / var(--print-scale, 1)) !important;
                        max-width: none !important;
                        max-height: none !important;
                        overflow: hidden !important;
                        box-sizing: border-box !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default ResumePreview;