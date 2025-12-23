#### HeyBabyy
### An AI-Powered Companion for Newborn Care & Parent Well-Being

HeyBabyy is an AI-driven web platform designed to support new parents during a baby’s first 1000 days—the most critical phase for physical, cognitive, and emotional development.
The platform blends rule-based intelligence, AI assistance, and trusted medical guidelines to simplify newborn care, reduce parental anxiety, and enable informed decision-making.

 ## Finalist — GE Healthcare Precision Challenge 2025

 ### Why HeyBabyy?

New parents often face:

Information overload from unreliable sources

Difficulty tracking growth, nutrition, and milestones

Missed vaccinations and health follow-ups

Lack of immediate, contextual guidance

HeyBabyy addresses these gaps through a single, unified dashboard powered by AI-assisted insights and medically grounded rules.

###  Core AI & Intelligence Features
## 1. Tiny – AI Voice & Chat Assistant

Conversational assistant available on the home page

Multilingual (English / Hindi)

Supports both text and voice

Provides contextual guidance on:

Sleep patterns

Feeding basics

Colic & hygiene

Designed with safety-first prompts and medical disclaimers

Informational only — not a replacement for professional medical advice.

## 2. Growth Monitor (Rule-Based + Analytics Ready)

Input baby’s:

Age (months)

Weight (kg)

Length (cm)

Gender

Uses a WHO-style LMS growth model (demo implementation) to calculate:

Z-score

Percentile

Visual sparkline for recent growth trends

Detects abnormal growth drift using rule-based thresholds

Designed to later integrate full WHO LMS datasets

## 3. Nutrition Tracker

Two logging modes:

Quick free-text logs
Example: “3am 90ml formula, 6 wet diapers”

Structured entry (feed type, quantity, diapers, stool count)

Rule-based intelligence:

Alerts if solids are logged before 6 months

Hydration warnings if diaper count is low

Nutrition tips based on age

Auto-generated daily summaries:

Total intake

Wet diapers

Stool frequency

Designed for seamless transition to ML-based parsing later

## 4. Visual Lab – AI Rash Advisor (Beta)

Drag-and-drop / click / paste image upload

Images stored securely via Supabase Storage

AI suggestion pipeline (MVP):

Rule-based analysis with safety prompts

Non-diagnostic guidance (e.g., heat rash, diaper rash)

Recent uploads gallery for quick comparison

Architecture ready for future computer vision models

## 5. Nearby Care Services

Location-based discovery of:

Pediatricians

Vaccination centers

Lactation consultants

Blood banks

Creches & preschools

Google Maps / Places integration

Distance-aware and rating-aware listing

Designed to move from client-side MVP → secure backend proxy

##  Baby Dashboard (Services → Dashboard)

A full-screen unified dashboard that brings together:

Growth Monitor

Nutrition Tracker

Dashboard Highlights

Clean, distraction-free UI

Live calculations and instant feedback

Demo data buttons for quick onboarding

Modular cards — easy to extend with:

Vaccination planner

Sleep tracking

Developmental milestone checks

# Tech Stack
Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

Responsive, accessible UI with soft gradient theme

Backend (MVP)

Next.js API Routes

Rule-based computation for growth & nutrition

Clean separation between UI and logic

Storage & Auth

Supabase

File storage (Visual Lab uploads)

Ready for user auth & data persistence

AI & Intelligence

Rule-based engines (MVP)

AI-ready architecture:

RAG for Tiny chatbot

Computer Vision for rash analysis

NLP parsing for nutrition logs

# Privacy & Safety by Design

No medical diagnosis claims

Explicit disclaimers across AI features

Minimal data collection in MVP

Architecture aligned for future HIPAA/GDPR-aware design

Secure storage via Supabase

 Project Status

Functional MVP

 End-to-end demo ready

 Modular, scalable architecture

 Advanced ML models planned (post-MVP)

 Recognition

Finalist – GE Healthcare Precision Challenge 2025

Recognized for applying AI to real-world healthcare and early-life well-being

Evaluated on innovation, feasibility, and social impact

 Roadmap

Full WHO LMS integration

Vaccination scheduler with reminders

Advanced RAG-based medical knowledge assistant

Offline-first mobile app

Pediatrician & hospital partnerships

 Team & Vision

HeyBabyy is built with the vision of human-centric AI in healthcare, focusing on:
Trust

Simplicity

Safety

Real-world usability for families

Trust

Simplicity

Safety

Real-world usability for families
