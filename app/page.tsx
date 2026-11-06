"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/tailgrids/core/card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkLogin } from "@/utils/login";

export default function Page() {
  const router = useRouter();
  useEffect(() => checkLogin(router, "/"), [router]);

  return (
    <div className="mx-auto mt-3 max-w-5xl rounded-lg border border-gray-300 p-3">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Left: Profile */}
        <div className="w-full min-w-0 shrink-0 md:w-[305px]">
          <Card className="!min-w-0 w-full max-w-full gap-0 overflow-hidden rounded-lg border border-gray-300">
            <CardContent className="!p-0">
              {/* Profile Image */}
              <div className="relative h-[260px] w-full overflow-hidden">
                <Image
                  src="/face.jpg"
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, 305px"
                  className="object-cover object-center"
                />
              </div>

              {/* Profile Information */}
              <div className="p-4">
                <h2 className="text-base font-bold">ศรัณยพงศ์ แซ่อึ้ง</h2>

                <p className="text-sm text-gray-500">นักศึกษา</p>

                <hr className="my-4 border-gray-300" />

                <div className="space-y-1 text-sm">
                  <p>
                    <strong>รหัสนักศึกษา :</strong> 68051901
                  </p>

                  <p>
                    <strong>คณะ :</strong> เทคโนโลยีสารสนเทศ
                  </p>

                  <p>
                    <strong>สาขา :</strong> วิทยาการคอมพิวเตอร์ (CSI)
                  </p>

                  <p>
                    <strong>สถานศึกษา :</strong> มหาวิทยาลัยศรีปทุม
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: About Me */}
        <div className="min-w-0 flex-1">
          <Card className="!min-w-0 h-full w-full max-w-full gap-0 rounded-lg bg-gray-50">
            <CardContent className="p-5">
              <h1 className="mb-4 text-xl font-bold">
                เกี่ยวกับฉัน (About Me)
              </h1>

              <p className="mb-4 text-sm leading-7">
                สวัสดีครับ ผมชื่อ ศรัณยพงศ์ แซ่อึ้ง
                ปัจจุบันกำลังศึกษาอยู่ที่คณะเทคโนโลยีสารสนเทศ
                สาขาวิทยาการคอมพิวเตอร์ (CSI) มหาวิทยาลัยศรีปทุม
              </p>

              <p className="text-sm leading-7">
                ผมมีความสนใจด้านเทคโนโลยี การเขียนโปรแกรม และการพัฒนาเว็บไซต์
                โดยเฉพาะการออกแบบ หน้าเว็บให้ใช้งานง่ายและมีความสวยงาม
              </p>

              <hr className="my-5 border-gray-200" />

              <h2 className="mb-3 text-base font-bold">เป้าหมายของฉัน</h2>

              <p className="text-sm leading-7">
                พัฒนาทักษะการเขียนโปรแกรมและการสร้างเว็บไซต์
                เพื่อนำความรู้ไปใช้ในการทำโปรเจกต์จริง
                และต่อยอดในการทำงานด้านเทคโนโลยีในอนาคต
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
