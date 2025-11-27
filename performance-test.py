import requests
import time
import json
from urllib.parse import urlparse

def comprehensive_speed_test(url):
    """
    Comprehensive speed test measuring TTFB, load time, and page metrics
    """
    print(f"\n{'='*60}")
    print(f"PERFORMANCE ANALYSIS: {url}")
    print(f"{'='*60}\n")
    
    try:
        # Test 1: Initial Connection & TTFB
        print("📊 TEST 1: Server Response Metrics")
        print("-" * 60)
        
        start = time.time()
        response = requests.get(url, stream=True, timeout=15)
        ttfb = time.time() - start
        
        # Download full content
        content = response.content
        total_time = time.time() - start
        content_size = len(content) / 1024  # KB
        
        print(f"✓ Status Code:           {response.status_code}")
        print(f"✓ TTFB (Server Latency): {ttfb:.4f}s")
        print(f"✓ Total Load Time:       {total_time:.4f}s")
        print(f"✓ Page Size:             {content_size:.2f} KB")
        print(f"✓ Content Type:          {response.headers.get('content-type', 'N/A')}")
        
        # Test 2: Headers Analysis
        print(f"\n📋 TEST 2: Response Headers Analysis")
        print("-" * 60)
        
        headers = response.headers
        print(f"✓ Server:                {headers.get('server', 'Not disclosed')}")
        print(f"✓ Cache-Control:         {headers.get('cache-control', 'Not set')}")
        print(f"✓ Content-Encoding:      {headers.get('content-encoding', 'None')}")
        print(f"✓ X-Vercel-Cache:        {headers.get('x-vercel-cache', 'N/A')}")
        
        # Test 3: Performance Benchmarks
        print(f"\n🎯 TEST 3: Performance Benchmarks (South African Standards)")
        print("-" * 60)
        
        # TTFB Assessment
        ttfb_status = "🟢 EXCELLENT" if ttfb < 0.2 else "🟡 GOOD" if ttfb < 0.5 else "🔴 NEEDS IMPROVEMENT"
        print(f"TTFB Assessment:         {ttfb_status}")
        print(f"  Target (Global):       < 0.2s")
        print(f"  Target (Local SA):     < 0.1s")
        print(f"  Your Result:           {ttfb:.4f}s")
        
        # Total Load Assessment
        load_status = "🟢 EXCELLENT" if total_time < 1.0 else "🟡 GOOD" if total_time < 2.5 else "🔴 NEEDS IMPROVEMENT"
        print(f"\nLoad Time Assessment:    {load_status}")
        print(f"  Target (LCP):          < 2.5s")
        print(f"  Your Result:           {total_time:.4f}s")
        
        # Page Size Assessment
        size_status = "🟢 EXCELLENT" if content_size < 500 else "🟡 GOOD" if content_size < 1500 else "🔴 NEEDS IMPROVEMENT"
        print(f"\nPage Size Assessment:    {size_status}")
        print(f"  Target:                < 1500 KB")
        print(f"  Your Result:           {content_size:.2f} KB")
        
        # Test 4: Multiple Request Test (Simulating Real Usage)
        print(f"\n⚡ TEST 4: Consistency Test (5 Requests)")
        print("-" * 60)
        
        ttfb_times = []
        for i in range(5):
            start = time.time()
            r = requests.get(url, stream=True, timeout=15)
            ttfb_times.append(time.time() - start)
            r.content  # Download content
        
        avg_ttfb = sum(ttfb_times) / len(ttfb_times)
        min_ttfb = min(ttfb_times)
        max_ttfb = max(ttfb_times)
        
        print(f"Average TTFB:            {avg_ttfb:.4f}s")
        print(f"Best TTFB:               {min_ttfb:.4f}s")
        print(f"Worst TTFB:              {max_ttfb:.4f}s")
        print(f"Consistency:             {((1 - (max_ttfb - min_ttfb) / avg_ttfb) * 100):.1f}%")
        
        # Summary
        print(f"\n{'='*60}")
        print("📈 PERFORMANCE SUMMARY")
        print(f"{'='*60}")
        
        issues = []
        if ttfb > 0.2:
            issues.append("⚠️  High TTFB - Consider CDN optimization")
        if total_time > 2.5:
            issues.append("⚠️  Slow LCP - Optimize images and defer JS")
        if content_size > 1500:
            issues.append("⚠️  Large page size - Enable compression")
        
        if issues:
            print("\n🔴 ISSUES DETECTED:")
            for issue in issues:
                print(f"  {issue}")
        else:
            print("\n🟢 ALL METRICS WITHIN TARGET RANGES!")
        
        return {
            'ttfb': ttfb,
            'total_time': total_time,
            'size_kb': content_size,
            'status': response.status_code,
            'avg_ttfb': avg_ttfb
        }
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        return None

if __name__ == "__main__":
    url = "https://digital-canvas-liart.vercel.app/"
    results = comprehensive_speed_test(url)
    
    if results:
        print(f"\n✅ Test completed successfully!")
        print(f"\nRaw Data (JSON):")
        print(json.dumps(results, indent=2))
