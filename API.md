## Constants

<dl>
<dt><a href="#CONSTANTS">CONSTANTS</a></dt>
<dd><p>Constants related to Dark Sky discovered during the creation of this library.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#forecast">forecast(latitude, longitude, [unit], [lang], [timeFormat])</a> ⇒ <code>object</code></dt>
<dd><p>Get the forecast of a coordinate pair.</p>
</dd>
<dt><a href="#details">details(date, latitude, longitude, [unit], [lang], [timeFormat])</a> ⇒ <code>object</code></dt>
<dd><p>Get detailed info on the weather of a coordinate pair on a specific day.</p>
</dd>
<dt><a href="#autocomplete">autocomplete(query)</a> ⇒ <code>object</code></dt>
<dd><p>Get search results for a place.</p>
</dd>
<dt><a href="#rgeo">rgeo(latitude, longitude, [hires])</a> ⇒ <code>Object</code></dt>
<dd><p>Convert coordinates to the name of a place.</p>
</dd>
<dt><a href="#geo">geo(query)</a> ⇒ <code>Object</code></dt>
<dd><p>Convert the name of the place to coordinates.</p>
</dd>
</dl>

<a name="CONSTANTS"></a>

## CONSTANTS
Constants related to Dark Sky discovered during the creation of this library.

**Kind**: global constant  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| UNIT_CODES | <code>object</code> | All unit systems Dark Sky accepts. |
| LANGUAGE_CODES | <code>object</code> | All languages Dark Sky accepts. |
| TIME_FORMATS | <code>Array.&lt;number&gt;</code> | All time formats Dark Sky accepts. |

<a name="forecast"></a>

## forecast(latitude, longitude, [unit], [lang], [timeFormat]) ⇒ <code>object</code>
Get the forecast of a coordinate pair.

**Kind**: global function  
**Returns**: <code>object</code> - An object containing forecast info.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| latitude | <code>number</code> |  |  |
| longitude | <code>number</code> |  |  |
| [unit] | <code>string</code> | <code>&quot;si&quot;</code> | What unit system you want to use. See lib.CONSTANTS.UNIT_CODES for more details. |
| [lang] | <code>string</code> | <code>&quot;en&quot;</code> | What language you want your forecast to be in. See lib.CONSTANTS.LANGUAGE_CODES for more details. |
| [timeFormat] | <code>number</code> | <code>24</code> | What time format you want your forecast in. Either 12-or-24-hour format. |

<a name="details"></a>

## details(date, latitude, longitude, [unit], [lang], [timeFormat]) ⇒ <code>object</code>
Get detailed info on the weather of a coordinate pair on a specific day.

**Kind**: global function  
**Returns**: <code>object</code> - An object containing detailed info info.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| date | <code>string</code> \| <code>Date</code> |  | If you're using a string, the format is `yyyy-mm-dd`. |
| latitude | <code>number</code> |  |  |
| longitude | <code>number</code> |  |  |
| [unit] | <code>string</code> | <code>&quot;si&quot;</code> | What unit system you want to use. See lib.CONSTANTS.UNIT_CODES for more details. |
| [lang] | <code>string</code> | <code>&quot;en&quot;</code> | What language you want your forecast to be in. See lib.CONSTANTS.LANGUAGE_CODES for more details. |
| [timeFormat] | <code>number</code> | <code>24</code> | What time format you want your forecast in. Either 12-or-24-hour format. |

<a name="autocomplete"></a>

## autocomplete(query) ⇒ <code>object</code>
Get search results for a place.

**Kind**: global function  
**Returns**: <code>object</code> - An array with search result objects.  

| Param | Type |
| --- | --- |
| query | <code>string</code> | 

<a name="rgeo"></a>

## rgeo(latitude, longitude, [hires]) ⇒ <code>Object</code>
Convert coordinates to the name of a place.

**Kind**: global function  
**Returns**: <code>Object</code> - Name for the coordinates.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| latitude | <code>number</code> |  |  |
| longitude | <code>number</code> |  |  |
| [hires] | <code>number</code> | <code>1</code> | Actually have no idea what this does. |

<a name="geo"></a>

## geo(query) ⇒ <code>Object</code>
Convert the name of the place to coordinates.

**Kind**: global function  
**Returns**: <code>Object</code> - The coordinate pair.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The place you want to look up. (eg. "5878 CR-47, Munnsville, NY") |

