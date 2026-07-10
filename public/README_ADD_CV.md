Place your CV PDF in this `public` folder and name it `cv.pdf`.

Steps:
1. Export or save your CV as PDF named `cv.pdf`.
2. Copy `cv.pdf` into the project's `public` directory.
3. Deploy or run the app; the link `/cv.pdf` will download the file from the site.

Optional: If you want a different filename or path, update the `href` in `app/page.tsx` or the header component to point to the chosen file.

Example HTML anchor:

<a href="/cv.pdf" download>Download CV</a>
