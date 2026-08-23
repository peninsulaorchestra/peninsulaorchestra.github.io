---
layout: page
permalink: /join/
head_title: Join the Orchestra — Peninsula Orchestra
description: Play with the Peninsula Orchestra. Competent amateur players of standard orchestral instruments are welcome — no auditions, no age restrictions.
banner_title: Join Us
banner_subtitle: Play with us this season
corner_flowers: true
---

{%- if site.registration_poster and site.registration_poster != "" %}
<div class="join-poster-band">
  <img class="join-poster" src="{{ site.registration_poster | relative_url }}"
       alt="{{ site.registration_poster_alt }}" />
</div>
{%- endif %}

## Who we are looking for

{% if site.registration_note %}{{ site.registration_note }}{% endif %}

Competent amateur players of standard orchestral instruments are most welcome.
**There are no auditions, and no restrictions as to age.** We are all non-paid
volunteers who want to keep up with our instruments for the love of it.

## What it involves

{% include rehearsal-facts.html %}

We perform throughout the year, with our busiest seasons being Christmas and
Spring, in churches, seniors' residences and parks across the Niagara region.

{%- if site.registration_url and site.registration_url != "" %}

## Registering

Registration for the season is open. The form takes a couple of minutes.

<a class="btn" href="{{ site.registration_url }}" target="_blank" rel="noopener">{{ site.registration_text }}</a>
{%- else %}

## Registering

Registration is not open at the moment. [Send us a message]({{ '/contact/' | relative_url }})
and we will let you know when it opens for the next season.
{%- endif %}
