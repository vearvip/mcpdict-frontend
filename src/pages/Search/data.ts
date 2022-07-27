export const data1 = `

<!-- MVP.css quickstart template: https://github.com/andybrewer/mvp/ -->

<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="icon" href="https://via.placeholder.com/70x70">
    <link rel="stylesheet" href="./mvp.css">

    <meta charset="utf-8">
    <meta name="description" content="My description">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>My title</title>
</head>

<body>
    <header>
        <nav>
            <a href="/"><img alt="Logo" src="https://via.placeholder.com/200x70?text=Logo" height="70"></a>
            <ul>
                <li>Menu Item 1</li>
                <li><a href="#">Menu Item 2</a></li>
                <li><a href="#">Dropdown Menu Item</a>
                    <ul>
                        <li><a href="#">Sublink with a long name</a></li>
                        <li><a href="#">Short sublink</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <h1>Page Heading with <i>Italics</i> and <u>Underline</u></h1>
        <p>Page Subheading with <mark>highlighting</mark></p>
        <br>
        <p><a href="#"><i>Italic Link Button</i></a><a href="#"><b>Bold Link Button &rarr;</b></a></p>
    </header>
    <main>
        <hr>
        <section>
            <header>
                <h2>Section Heading</h2>
                <p>Section Subheading</p>
            </header>
            <aside>
                <h3>Card heading</h3>
                <p>Card content*</p>
                <p><small>*with small content</small></p>
            </aside>
            <aside>
                <h3>Card heading</h3>
                <p>Card content <sup>with notification</sup></p>
            </aside>
            <aside>
                <h3>Card heading</h3>
                <p>Card content</p>
            </aside>
        </section>
        <hr>
        <section>
            <blockquote>
                "Quote"
                <footer><i>- Attribution</i></footer>
            </blockquote>
        </section>
        <hr>
        <section>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Col A</th>
                        <th>Col B</th>
                        <th>Col C</th>
                    </tr>
                </thead>
                <tr>
                    <td>Row 1</td>
                    <td>Cell A1</td>
                    <td>Cell B1</td>
                    <td>Cell C1</td>
                </tr>
                <tr>
                    <td>Row 2</td>
                    <td>Cell A2</td>
                    <td>Cell B2</td>
                    <td>Cell C2</td>
                </tr>
            </table>
        </section>
        <hr>
        <article>
            <h2>Left-aligned header</h2>
            <p>Left-aligned paragraph</p>
            <aside>
                <p>Article callout</p>
            </aside>
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
            </ul> 
        </article>
        <hr>
        <div>
            <details>
                <summary>Expandable title</summary>
                <p>Revealed content</p>
            </details>
            <details>
                <summary>Another expandable title</summary>
                <p>More revealed content</p>
            </details>
            <br>
            <p>Inline <code>code</code> snippets</p>
            <pre>
                <code>
// preformatted code block
                </code>
            </pre>
        </div>
        <hr>
        <section>
            <form>
                <header>
                    <h2>Form title</h2>
                </header>
                <label for="input1">Input label:</label>
                <input type="text" id="input1" name="input1" size="20" placeholder="Input1">
                <label for="select1">Select label:</label>
                <select id="select1">
                    <option value="option1">option1</option>
                    <option value="option2">option2</option>
                </select>
                <label for="textarea1">Textarea label:</label>
                <textarea cols="40" rows="5" id="textarea1"></textarea>
                <button type="submit">Submit</button>
            </form>
        </section>
    </main>
    <footer>
        <hr>
        <p>
            <small>Contact info</small>
        </p>
    </footer>
</body>

</html>
`

export const data2 = `
<article class="markdown-body entry-content container-lg" itemprop="text"><p dir="auto"><a target="_blank" rel="noopener noreferrer" href="/andybrewer/mvp/blob/master/img/logo.png"><img src="/andybrewer/mvp/raw/master/img/logo.png" alt="MVP.css" style="max-width: 100%;"></a></p>
<h1 dir="auto"><a id="user-content-mvpcss--minimalist-stylesheet-for-html-elements" class="anchor" aria-hidden="true" href="#mvpcss--minimalist-stylesheet-for-html-elements"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>MVP.css — Minimalist stylesheet for HTML elements</h1>
<p dir="auto">Out of the box CSS styling for HTML elements. No class names, no framework to learn.</p>
<p dir="auto"><code>&lt;link rel="stylesheet" href="https://unpkg.com/mvp.css"&gt;</code></p>
<p dir="auto">Live demo: <a href="https://andybrewer.github.io/mvp/" rel="nofollow">https://andybrewer.github.io/mvp/</a></p>
<p dir="auto">Unpkg: <a href="https://unpkg.com/mvp.css" rel="nofollow">https://unpkg.com/mvp.css</a></p>
<p dir="auto">NPM: <a href="https://www.npmjs.com/package/mvp.css" rel="nofollow">https://www.npmjs.com/package/mvp.css</a></p>
<h2 dir="auto"><a id="user-content-versions" class="anchor" aria-hidden="true" href="#versions"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Versions</h2>
<h3 dir="auto"><a id="user-content-v18" class="anchor" aria-hidden="true" href="#v18"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>v1.8</h3>
<ul dir="auto">
<li>Updated <code>&lt;p&gt;</code> to be full width</li>
<li>Added <code>--color-link</code> and <code>--color-table</code> variables</li>
<li>Added <code>--active-brightness</code> variable plus <code>a:active</code> and <code>button:active</code> styles</li>
<li>Uncommented dark mode</li>
</ul>
<h3 dir="auto"><a id="user-content-v17" class="anchor" aria-hidden="true" href="#v17"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>v1.7</h3>
<ul dir="auto">
<li>Updated <code>&lt;a&gt;</code> to use <code>--color</code> (primary color)</li>
<li>Updated <code>&lt;section&gt;</code> to handle overflow content</li>
<li>Updated <code>&lt;section&gt;&lt;img&gt;</code> and <code>&lt;article&gt;&lt;img&gt;</code> to with within their containers by default</li>
<li>Added a showcase section to README</li>
</ul>
<h3 dir="auto"><a id="user-content-v16" class="anchor" aria-hidden="true" href="#v16"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>v1.6</h3>
<ul dir="auto">
<li>Added <code>[hidden]</code> styling to hide hidden elements</li>
<li>Updated alternate table rows to use <code>--color-accent</code> for a more branded look</li>
<li>Updated <code>&lt;table&gt;</code> to use <code>display: block</code> and removed <code>overflow</code> styling</li>
<li>Updated <code>font</code> variable to <code>font-family</code></li>
<li>Updated <code>&lt;pre&gt;</code>, <code>&lt;code&gt;</code> and <code>&lt;samp&gt;</code> styling to have proper padding and recognize indented content</li>
<li>Updated <code>line-height</code> to be a number instead of a percentage</li>
<li>Updated multi-word dropdown menu titles to render on a single line</li>
</ul>
<h3 dir="auto"><a id="user-content-v15" class="anchor" aria-hidden="true" href="#v15"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>v1.5</h3>
<ul dir="auto">
<li>Added browser default <code>:focus</code> styling back in for better tabbed navigation</li>
<li>Updated <code>&lt;a&gt;</code> styling to use <code>display: inline-block</code> for better focus outlines on buttons</li>
<li>Added <code>&lt;label&gt;</code> styling for <code>checkbox</code> and <code>radio</code> elements</li>
<li>Added striped <code>&lt;table&gt;</code></li>
</ul>
<h3 dir="auto"><a id="user-content-v14" class="anchor" aria-hidden="true" href="#v14"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>v1.4</h3>
<ul dir="auto">
<li>Updated <code>&lt;pre&gt;</code> styling to use <code>pre-line</code> for better line breaks</li>
<li>Added hover styling to <code>&lt;details&gt;&lt;summary&gt;</code> tags</li>
</ul>
<h3 dir="auto"><a id="user-content-v13" class="anchor" aria-hidden="true" href="#v13"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>v1.3</h3>
<ul dir="auto">
<li>Updated <code>&lt;button&gt;</code> <code>line-height</code> and <code>font</code> to match <code>&lt;a&gt;&lt;b&gt;</code> button styles</li>
<li>Added a <code>--font</code> variable</li>
<li>Added dropdown menus</li>
</ul>
<h3 dir="auto"><a id="user-content-v12" class="anchor" aria-hidden="true" href="#v12"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>v1.2</h3>
<ul dir="auto">
<li>Added <code>checkbox</code> and <code>radio</code> styling for <code>&lt;input&gt;</code> fields</li>
<li>Added <code>disabled</code> and <code>readonly</code> styling</li>
</ul>
<h3 dir="auto"><a id="user-content-v11" class="anchor" aria-hidden="true" href="#v11"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>v1.1</h3>
<ul dir="auto">
<li>Updated code blocks to use <code>&lt;pre&gt;&lt;code&gt;</code> instead of <code>&lt;samp&gt;</code></li>
<li>Added light styling for <code>&lt;select&gt;</code> fields</li>
<li>Added <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> tags</li>
<li>Added <code>prefers-color-scheme: dark</code> media query (commented out by default)</li>
<li>Updated <code>&lt;table&gt;</code> styling</li>
</ul>
<h2 dir="auto"><a id="user-content-contributors" class="anchor" aria-hidden="true" href="#contributors"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Contributors</h2>
<ul dir="auto">
<li><a href="https://github.com/andybrewer">andybrewer</a></li>
<li><a href="https://github.com/aembleton">aembleton</a></li>
<li><a href="https://github.com/afeld">afeld</a></li>
<li><a href="https://github.com/cfv1984">cfv1984</a></li>
<li><a href="https://github.com/coolaj86">coolaj86</a></li>
<li><a href="https://github.com/ctp52">ctp52</a></li>
<li><a href="https://github.com/DiemenDesign">DiemenDesign</a></li>
<li><a href="https://github.com/edlinkiii">edlinkiii</a></li>
<li><a href="https://github.com/ericwbailey">ericwbailey</a></li>
<li><a href="https://github.com/GrosSacASac">GrosSacASac</a></li>
<li><a href="https://github.com/hongsw">hongsw</a></li>
<li><a href="https://github.com/irfaardy">irfaardy</a></li>
<li><a href="https://github.com/martin-v">martin-v</a></li>
<li><a href="https://github.com/michaelp-coder">michaelp-coder</a></li>
<li><a href="https://github.com/nikolai-cc">nikolai-cc</a></li>
<li><a href="https://github.com/ruudud">ruudud</a></li>
<li><a href="https://github.com/ScottGuthart">ScottGuthart</a></li>
<li><a href="https://github.com/simonw">simonw</a></li>
<li><a href="https://github.com/thedamon">thedamon</a></li>
</ul>
<h2 dir="auto"><a id="user-content-showcase" class="anchor" aria-hidden="true" href="#showcase"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Showcase</h2>
<ul dir="auto">
<li><a href="https://bliss.js.org/" rel="nofollow">https://bliss.js.org/</a></li>
<li><a href="https://chrisbilger.com/" rel="nofollow">https://chrisbilger.com/</a></li>
<li><a href="https://figmage.com/" rel="nofollow">https://figmage.com/</a></li>
<li><a href="https://geozip.xyz" rel="nofollow">https://geozip.xyz</a></li>
<li><a href="http://nextvita.vercel.app/" rel="nofollow">http://nextvita.vercel.app/</a></li>
<li><a href="https://searchcode.com/" rel="nofollow">https://searchcode.com/</a></li>
<li><a href="https://www.thebearontheroof.com/" rel="nofollow">https://www.thebearontheroof.com/</a></li>
</ul>
<p dir="auto">To submit your site built with MVP.css create a pull request or an issue. For pull requests, please keep sites in alphabetical order.</p>
</article>
`