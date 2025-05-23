import * as React from "react"
import Image from "next/image"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

const reviews = [
  {
    name: "Sarah",
    profilePic: "/review1.jpeg",
    feedback:
      "This companion has been a lifeline during my exam season. It helped me slow down, check in with myself, and actually feel calmer every day.",
    rating: 5,
  },
  {
    name: "Michael",
    profilePic: "/review2.jpeg",
    feedback:
      "I used to get overwhelmed trying to stay focused. This tool gently reminded me to breathe, reflect, and stay present. My productivity has improved noticeably.",
    rating: 4,
  },
  {
    name: "Bojert",
    profilePic: "/review3.jpg",
    feedback:
      "The daily reflections and mindful pauses gave me space to be kinder to myself. I didn’t realize how much I needed that until I had it.",
    rating: 5,
  },
]

function renderStars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating)
}

export default function UserReviews() {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          What Students Are Saying
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, idx) => (
            <Card key={idx} className="bg-white">
              <CardHeader className="flex flex-col items-center text-center">
                <Image
                  src={review.profilePic}
                  alt={review.name}
                  width={84}
                  height={84}
                  className="rounded-full mb-2 object-cover"
                />
                <CardTitle>{review.name}</CardTitle>
                <CardDescription className="text-green-500">
                  {renderStars(review.rating)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic text-center">
                  "{review.feedback}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
